import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { SEO } from '../components/SEO';
import { Icon } from '@iconify/react';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: any;
  excerpt?: string;
  image?: string;
  createdAt: string;
  author?: {
    firstName: string;
    lastName: string;
    displayName?: string;
    avatar?: string;
  };
  category?: {
    id: string;
    name: string;
  };
  tags?: Array<{
    id: string;
    name: string;
    slug?: string;
  }>;
}

export function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        // Fetch by slug
        const data = await api.get(`/public/articles/${slug}`);
        setArticle(data);
      } catch (err: any) {
        console.error('Failed to fetch article:', err);
        setError('Article not found');
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getImageUrl = (url?: string) => {
    if (!url) return '/images/placeholder.png';
    if (url.startsWith('http')) return url;
    return `http://localhost:3001${url}`;
  };

  const getAuthorName = () => {
    if (!article?.author) return 'Law4Minor Team';
    return article.author.displayName || `${article.author.firstName} ${article.author.lastName}`;
  };

  const renderContent = () => {
    if (!article?.content) return '';
    
    // If content is a Lexical JSON object, we need to convert it to HTML
    // For now, we'll render a simple text version or check if it has HTML
	// Still requires large amount of fixes in future :(
    if (typeof article.content === 'string') {
      return article.content;
    }
    
    // Lexical content - extract text from the JSON structure
    try {
      const root = article.content?.root;
      if (root?.children) {
        return root.children.map((node: any) => {
          if (node.type === 'paragraph') {
            const text = node.children?.map((c: any) => c.text || '').join('') || '';
            return `<p>${text}</p>`;
          }
          if (node.type === 'heading') {
            const text = node.children?.map((c: any) => c.text || '').join('') || '';
            const tag = node.tag || 'h2';
            return `<${tag}>${text}</${tag}>`;
          }
          if (node.type === 'quote') {
            const text = node.children?.map((c: any) => c.text || '').join('') || '';
            return `<blockquote>${text}</blockquote>`;
          }
          if (node.type === 'list') {
            const tag = node.listType === 'number' ? 'ol' : 'ul';
            const items = node.children?.map((item: any) => {
              const text = item.children?.map((c: any) => c.children?.map((t: any) => t.text || '').join('') || c.text || '').join('') || '';
              return `<li>${text}</li>`;
            }).join('') || '';
            return `<${tag}>${items}</${tag}>`;
          }
		  if (node.type === 'code') {
			const text = node.children?.map((c: any) => c.text || '').join('') || '';
			return `<pre><code>${text}</code></pre>`;
		  }
          return '';
        }).join('\n');
      }
    } catch (e) {
      console.error('Error parsing content:', e);
    }
    
    return '<p>Content loading...</p>';
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading article...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-24 min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-serif text-gray-800">Article Not Found</h1>
        <Link to="/articles" className="text-[var(--color-primary)] hover:underline">
          ← Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <SEO
        title={article.title}
        description={article.excerpt || `Read "${article.title}" on Law4Minor`}
        image={getImageUrl(article.image)}
        url={`/articles/${article.slug}`}
        type="article"
        article={{
          publishedTime: article.createdAt,
          author: getAuthorName(),
          tags: article.tags?.map(t => t.name),
        }}
      />
      {/* Article Header */}
      <section className="pt-12 pb-12 md:pt-20 md:pb-16 px-6">
        <div className="container max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
                 <Link to="/articles" className="text-gray-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium tracking-wide">
                    ALL ARTICLES
                 </Link>
                 <span className="text-gray-300">/</span>
                 <span className="text-[var(--color-primary)] uppercase text-sm font-bold tracking-wide">
                   {article.category?.name || 'General'}
                 </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--color-accent)] leading-tight mb-8">
                {article.title}
            </h1>

			{/* author info */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
						{article.author?.avatar ? (
							<img 
							  src={getImageUrl(article.author.avatar)} 
							  alt={getAuthorName()} 
							  className="w-full h-full object-cover"
							/>
						) : (
							<Icon icon="mdi:account" className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden"/>
						)}
                    </div>
                    <span>{getAuthorName()}</span>
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{formatDate(article.createdAt)}</span>
            </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-4 md:px-8">
          <div className="container max-w-5xl mx-auto">
             <div className="w-full aspect-[21/9] overflow-hidden rounded-lg shadow-sm">
                 {article.image ? (
						<img
							src={getImageUrl(article.image)}
							alt={article.title}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full bg-gray-300 flex items-center justify-center">
							<img src="/favicon.png" alt="No Image" className="w-32 h-32 grayscale contrast-50 brightness-150" />
						</div>
					)}
             </div>
          </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 px-2">
        <div className="container max-w-4xl mx-auto">
            <article
              className="prose prose-lg prose-slate 
                prose-headings:font-serif prose-headings:font-semibold prose-headings:text-[var(--color-accent)] 
                prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6 
                prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline 
                prose-blockquote:border-l-[var(--color-primary)] prose-blockquote:bg-[var(--color-paper)] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
                prose-blockquote:text-[var(--color-accent)] prose-blockquote:font-serif prose-blockquote:text-xl
                prose-li:text-gray-600 prose-ul:list-disc prose-ol:list-decimal prose-li:my-2
                prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: renderContent() }}
            />
            
            <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-400">Published in</span>
                    <span className="font-serif text-lg text-[var(--color-accent)]">{article.category?.name || 'General'}</span>
                </div>
                
                <div className="flex gap-4">
					<span className='font-serif text-lg text-[var(--color-accent)]'>Share This Article</span>
                     <a href={`https://twitter.com/intent/tweet?text=Check out this article: ${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                        <span className="sr-only">Share on Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                     </a>
                     <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">
                        <span className="sr-only">Share on Facebook</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                     </a>
                      <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="text-gray-400 hover:text-[var(--color-accent)] transition-colors cursor-pointer">
                        <span className="sr-only">Copy Link</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                     </button>
                </div>
            </div>

            {/* Tags Section */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag: any) => (
                    <Link
                      key={tag.id}
                      to={`/articles/tag/${tag.slug || tag.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-4 py-2 bg-[var(--color-paper)] text-[var(--color-accent)] rounded-full text-sm font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-12">
               <Link to="/articles" className="inline-flex items-center gap-2 text-[var(--color-primary)] font-medium hover:gap-3 transition-all">
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  Back to Articles
               </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
