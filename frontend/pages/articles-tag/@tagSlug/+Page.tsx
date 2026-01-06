import { useState, useEffect } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { Icon } from '@iconify/react'

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  category?: { name: string };
  createdAt: string;
}

export default function Page() {
  const pageContext = usePageContext() as any;
  const tagSlug = pageContext.routeParams?.tagSlug;
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      if (!tagSlug) return;
      try {
        const response = await fetch(`http://localhost:3001/api/public/articles?tag=${tagSlug}`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data || []);
          setTagName(tagSlug.replace(/-/g, ' '));
        }
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [tagSlug]);

  const getImageUrl = (url?: string) => {
    if (!url) return '/images/placeholder.png';
    if (url.startsWith('http')) return url;
    return `http://localhost:3001${url}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-paper)] pt-32 pb-16">
        <div className="container">
          <a href="/articles" className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline mb-4">
            <Icon icon="mdi:arrow-left" className="w-4 h-4" />
            All Articles
          </a>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-accent)] mt-2 mb-4">
            #{tagName}
          </h1>
          <p className="text-lg text-gray-600">
            {articles.length} article{articles.length !== 1 ? 's' : ''} tagged with "{tagName}"
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <Icon icon="mdi:file-document-outline" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">No articles found</h3>
              <p className="text-gray-400 mt-2">No articles with this tag yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <a
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div className="relative overflow-hidden aspect-[4/3] rounded-sm bg-gray-100">
                    {article.image ? (
                      <img
                        src={getImageUrl(article.image)}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <img src="/favicon.png" alt="No Image" className="w-32 h-32 grayscale contrast-50 brightness-150" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[var(--color-accent)] group-hover:text-[var(--color-primary)] transition-colors mb-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-600 text-sm line-clamp-2">{article.excerpt}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
