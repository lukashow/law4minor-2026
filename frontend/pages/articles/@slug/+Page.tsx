import { useState, useEffect } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Icon } from '@iconify/react'

interface Article {
  id: string;
  title: string;
  slug: string;
  content: any;
  excerpt?: string;
  image?: string;
  category?: { name: string; slug: string };
  tags?: { id: string; name: string; slug: string }[];
  author?: { firstName: string; lastName: string; avatar?: string };
  createdAt: string;
  publishedAt?: string;
}

export default function Page() {
  const pageContext = usePageContext() as any;
  const slug = pageContext.routeParams?.slug;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) return;
      try {
        const response = await fetch(`http://localhost:3001/api/public/articles/${slug}`);
        if (response.ok) {
          setArticle(await response.json());
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  const getImageUrl = (url?: string) => {
    if (!url) return '/images/placeholder.png';
    if (url.startsWith('http')) return url;
    return `http://localhost:3001${url}`;
  };

  const getAuthorName = () => {
    if (!article?.author) return 'Anonymous';
    return `${article.author.firstName} ${article.author.lastName}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = () => {
    if (!article?.content) return '';
    if (typeof article.content === 'string') return article.content;
    
    try {
      const parsed = typeof article.content === 'string' ? JSON.parse(article.content) : article.content;
      if (parsed.root?.children) {
        return parsed.root.children.map((node: any) => {
          if (node.type === 'paragraph') {
            const text = node.children?.map((c: any) => c.text || '').join('') || '';
            return `<p>${text}</p>`;
          }
          if (node.type === 'heading') {
            const text = node.children?.map((c: any) => c.text || '').join('') || '';
            const tag = `h${node.tag || 2}`;
            return `<${tag}>${text}</${tag}>`;
          }
          if (node.type === 'list') {
            const tag = node.listType === 'number' ? 'ol' : 'ul';
            const items = node.children?.map((item: any) => {
              const text = item.children?.[0]?.children?.map((c: any) => c.text || '').join('') || '';
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
    } catch {
      return String(article.content);
    }
    return '';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Icon icon="mdi:file-document-alert" className="w-24 h-24 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-600">Article Not Found</h1>
        <p className="text-gray-400 mt-2">The article you're looking for doesn't exist.</p>
        <a href="/articles" className="btn btn-primary mt-6">Back to Articles</a>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-[var(--color-paper)] pt-32 pb-8">
        <div className="container max-w-4xl">
          {article.category && (
            <a href={`/articles-tag/${article.category.slug}`} className="text-[var(--color-primary)] text-sm font-medium uppercase tracking-wider hover:underline">
              {article.category.name}
            </a>
          )}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-accent)] mt-4 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                {article.author?.avatar ? (
                  <img 
                    src={getImageUrl(article.author.avatar)} 
                    alt={getAuthorName()} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon icon="mdi:account" className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <span>{getAuthorName()}</span>
            </div>
            <span>{formatDate(article.publishedAt || article.createdAt)}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
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
      <section className="section">
        <div className="container max-w-3xl">
          <article 
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[var(--color-accent)] prose-a:text-[var(--color-primary)]"
            dangerouslySetInnerHTML={{ __html: renderContent() }}
          />
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <a
                    key={tag.id}
                    href={`/articles-tag/${tag.slug}`}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                  >
                    #{tag.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Back Link */}
      <section className="pb-16">
        <div className="container max-w-3xl">
          <a href="/articles" className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline">
            <Icon icon="mdi:arrow-left" className="w-5 h-5" />
            Back to Articles
          </a>
        </div>
      </section>
    </>
  );
}
