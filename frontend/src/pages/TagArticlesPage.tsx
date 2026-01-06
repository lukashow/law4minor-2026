import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  createdAt: string;
  author?: {
    name: string;
    avatar?: string;
  };
  category?: {
    id: string;
    name: string;
  };
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export function TagArticlesPage() {
  const { tagSlug } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [tag, setTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch articles by tag slug
        const response = await fetch(`http://localhost:3001/api/public/articles?tagSlug=${tagSlug}`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data.items || []);
          // Try to get tag info from articles or fetch separately
          if (data.tag) {
            setTag(data.tag);
          }
        } else {
          setError('Failed to load articles');
        }
      } catch (err) {
        console.error('Failed to fetch articles by tag:', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    }
    
    if (tagSlug) {
      fetchData();
    }
  }, [tagSlug]);

  const getImageUrl = (url?: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80';
    if (url.startsWith('http')) return url;
    return `http://localhost:3001${url}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-paper)]">
      <SEO 
        title={`Articles tagged: ${tag?.name || tagSlug?.replace(/-/g, ' ')}`}
        description={`Browse all articles tagged with ${tag?.name || tagSlug?.replace(/-/g, ' ')} on Law4Minor.`}
        url={`/articles/tag/${tagSlug}`}
      />
      {/* Hero Section */}
      <section className="relative py-16 bg-[var(--color-accent)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

        <div className="container relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-semibold uppercase tracking-widest mb-4">
            Tag
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            #{tag?.name || tagSlug?.replace(/-/g, ' ')}
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Browse articles tagged with this topic
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No articles found with this tag.</p>
              <Link to="/articles" className="text-[var(--color-primary)] hover:underline">
                View all articles
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/articles/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={getImageUrl(article.image)}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {article.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-medium rounded-full">
                          {article.category.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2 mb-3">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{formatDate(article.createdAt)}</span>
                      {article.author && (
                        <span className="flex items-center gap-2">
                          {article.author.avatar && (
                            <img
                              src={getImageUrl(article.author.avatar)}
                              alt={article.author.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          )}
                          {article.author.name}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-[var(--color-primary)] font-medium hover:gap-3 transition-all"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
