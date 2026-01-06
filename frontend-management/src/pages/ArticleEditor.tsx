import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LexicalEditor from '../components/LexicalEditor';
import { FileUpload } from '../components/FileUpload';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import type { EditorState } from 'lexical';

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  displayName?: string;
}

export function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [customExcerpt, setCustomExcerpt] = useState(false);
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED' | 'REJECTED'>('DRAFT');
  const [categoryId, setCategoryId] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [editorContent, setEditorContent] = useState<any>(null);
  const [authorId, setAuthorId] = useState('');
  
  // Autosave state
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const autosaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const articleIdRef = useRef<string | null>(null);
  
  // Available options from API
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Check if user can change author
  const canChangeAuthor = user?.role === 'ADMIN' || user?.role === 'EDITOR';
  // Check if user can publish
  const canPublish = user?.role === 'ADMIN' || user?.role === 'EDITOR';

  // Fetch categories, tags, and authors
  useEffect(() => {
    async function fetchOptions() {
      try {
        const [categoriesData, tagsData, usersData] = await Promise.all([
          api.get('/categories'),
          api.get('/tags'),
          api.get('/users'),
        ]);
        setCategories(categoriesData || []);
        setTags(tagsData || []);
        setAuthors(usersData || []);
        
        // Set default author to current user if not editing
        if (!id && user?.id) {
          setAuthorId(user.id);
        }
      } catch (err) {
        console.error('Failed to fetch options:', err);
      }
    }
    fetchOptions();
  }, [id, user?.id]);

  // Fetch article if editing
  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    setIsLoading(true);
    try {
      const article = await api.get(`/posts/${id}`);
      setTitle(article.title);
      setSlug(article.slug);
      setExcerpt(article.excerpt || '');
      setStatus(article.status);
      setCategoryId(article.categoryId || '');
      setSelectedTags(article.tags?.map((t: any) => t.id) || []);
      setFeaturedImage(article.image || '');
      setEditorContent(article.content);
      setAuthorId(article.authorId || '');
      setAutoSlug(false);
    } catch (err) {
      console.error('Failed to fetch article:', err);
      setError('Failed to load article');
    } finally {
      setIsLoading(false);
    }
  };

  const [autoSlug, setAutoSlug] = useState(true);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    // Auto-generate slug if creating new article and slug hasn't been manually edited
    if (!id && autoSlug) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoSlug(false); // User manually edited slug
    setSlug(generateSlug(e.target.value));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSaving(true);
    setError(null);

    // Determine final status - Writers can only save as DRAFT
    let finalStatus = status;
    if (!canPublish && status !== 'DRAFT') {
      finalStatus = 'DRAFT';
    }

    const articleData: any = {
      title,
      slug: slug || generateSlug(title),
      content: editorContent || {},
      excerpt,
      status: finalStatus,
      categoryId: categoryId || undefined,
      tagIds: selectedTags.length > 0 ? selectedTags : undefined,
      image: featuredImage || undefined,
    };

    // Only include authorId if user can change it
    if (canChangeAuthor && authorId) {
      articleData.authorId = authorId;
    }

    try {
      if (id) {
        await api.put(`/posts/${id}`, articleData);
      } else {
        await api.post('/posts', articleData);
      }
      navigate('/admin/articles');
    } catch (err: any) {
      setError(err.message || 'Failed to save article');
    } finally {
      setIsSaving(false);
    }
  };

  // Generate excerpt from content
  const generateExcerpt = (text: string) => {
    if (!text) return '';
    // Take first 160 chars, cut at word boundary
    if (text.length <= 160) return text;
    const cut = text.substring(0, 160);
    const lastSpace = cut.lastIndexOf(' ');
    return lastSpace > 100 ? cut.substring(0, lastSpace) + '...' : cut + '...';
  };

  // Autosave function
  const performAutosave = useCallback(async () => {
    if (!title.trim()) return; // No autosave without title
    
    setIsAutoSaving(true);
    
    // Generate excerpt if not custom
    let finalExcerpt = excerpt;
    if (!customExcerpt && editorContent) {
      try {
        // Extract plain text from editor content
        let plainText = '';
        if (editorContent.root?.children) {
          plainText = editorContent.root.children
            .map((node: any) => {
              if (node.children) {
                return node.children.map((c: any) => c.text || '').join('');
              }
              return '';
            })
            .join(' ')
            .trim();
        }
        finalExcerpt = generateExcerpt(plainText);
        setExcerpt(finalExcerpt);
      } catch (e) {
        console.error('Failed to generate excerpt:', e);
      }
    }

    let finalStatus = status;
    if (!canPublish && status !== 'DRAFT') {
      finalStatus = 'DRAFT';
    }

    const articleData: any = {
      title,
      slug: slug || generateSlug(title),
      content: editorContent || {},
      excerpt: finalExcerpt,
      status: finalStatus,
      categoryId: categoryId || undefined,
      tagIds: selectedTags.length > 0 ? selectedTags : undefined,
      image: featuredImage || undefined,
    };

    if (canChangeAuthor && authorId) {
      articleData.authorId = authorId;
    }

    try {
      if (articleIdRef.current) {
        await api.put(`/posts/${articleIdRef.current}`, articleData);
      } else if (id) {
        await api.put(`/posts/${id}`, articleData);
      } else {
        // Create new article on first autosave
        const result = await api.post('/posts', articleData);
        articleIdRef.current = result.id;
        // Update URL without navigation
        window.history.replaceState(null, '', `/admin/articles/edit/${result.id}`);
      }
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Autosave failed:', err);
    } finally {
      setIsAutoSaving(false);
    }
  }, [title, slug, editorContent, excerpt, status, categoryId, selectedTags, featuredImage, authorId, canChangeAuthor, canPublish, id, customExcerpt]);

  // Debounced autosave trigger
  const triggerAutosave = useCallback(() => {
    setHasUnsavedChanges(true);
    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current);
    }
    autosaveTimeoutRef.current = setTimeout(() => {
      performAutosave();
    }, 3000); // Autosave after 3 seconds of inactivity
  }, [performAutosave]);

  const handleEditorChange = useCallback((editorState: EditorState) => {
    setEditorContent(editorState.toJSON());
    triggerAutosave();
  }, [triggerAutosave]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(tid => tid !== tagId)
        : [...prev, tagId]
    );
    triggerAutosave();
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading article...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800 font-serif">
            {id || articleIdRef.current ? 'Edit Article' : 'New Article'}
          </h1>
          {/* Autosave indicator */}
          {isAutoSaving && (
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Saving...
            </span>
          )}
          {!isAutoSaving && lastSaved && (
            <span className="text-sm text-green-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
          {hasUnsavedChanges && !isAutoSaving && (
            <span className="text-sm text-amber-600">Unsaved changes</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/articles')}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-primary"
          >
            {isSaving ? 'Saving...' : 'Save Article'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <input
              type="text"
              placeholder="Article title..."
              className="w-full text-2xl font-bold border-none focus:outline-none focus:ring-0 placeholder-gray-300"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
              <span>Permalink:</span>
              <span className="text-gray-400">/articles/</span>
              <input
                type="text"
                placeholder="article-slug"
                className="flex-1 text-sm text-gray-700 border-none focus:ring-0 p-0 bg-transparent focus:outline-none"
                value={slug}
                onChange={handleSlugChange}
              />
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <LexicalEditor
              onChange={handleEditorChange}
              initialContent={editorContent}
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Excerpt</h3>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={customExcerpt}
                  onChange={(e) => setCustomExcerpt(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-600">Custom excerpt</span>
              </label>
            </div>
            <textarea
              placeholder={customExcerpt ? "Write a custom summary..." : "Auto-generated from content..."}
              className={`w-full h-24 border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 focus:outline-none resize-none ${
                !customExcerpt ? 'bg-gray-50 text-gray-500' : ''
              }`}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              disabled={!customExcerpt}
            />
            {!customExcerpt && (
              <p className="text-xs text-gray-500 mt-2">Excerpt will be auto-generated from content when saving.</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Status</h3>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              disabled={!canPublish && status !== 'DRAFT'}
            >
              <option value="DRAFT">Draft</option>
              {canPublish && (
                <>
                  <option value="PUBLISHED">Published</option>
                  <option value="REJECTED">Rejected</option>
                </>
              )}
            </select>
            {!canPublish && (
              <p className="text-xs text-gray-500 mt-2">
                Only Editors and Admins can publish articles.
              </p>
            )}
          </div>

          {/* Author (for Editor/Admin) */}
          {canChangeAuthor && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Author</h3>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select author...</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.displayName || `${author.firstName} ${author.lastName}`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Category */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Category</h3>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
              {tags.length === 0 && (
                <p className="text-sm text-gray-400">No tags available</p>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Featured Image</h3>
            {featuredImage ? (
              <div className="relative group">
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFeaturedImage('')}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <FileUpload
                onUpload={(media) => setFeaturedImage(media.url)}
                currentUrl={featuredImage}
                accept="image/*"
                placeholder="Upload Featured Image"
                className="h-40"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
