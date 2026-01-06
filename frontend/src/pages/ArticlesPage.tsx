import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { SEO } from '../components/SEO';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: { id: string; name: string };
  createdAt: string;
  image?: string;
}

interface Category {
  id: string;
  name: string;
}

export function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [articlesData, categoriesData] = await Promise.all([
          api.get('/public/articles'),
          api.get('/public/categories'),
        ]);
        setArticles(articlesData.items || []);
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category?.name === activeCategory);

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

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-paper)]">
      <SEO 
        title="Articles"
        description="Explore our curated collection of articles on legal topics, youth rights, and stories from the legal world. Legal knowledge simplified."
        url="/articles"
      />
      {/* Hero */}
      <section className="relative py-20 px-6 md:px-12 border-b border-gray-200 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
                <span className="text-[var(--color-primary)] font-medium tracking-wide uppercase text-sm mb-3 block">Perspective & Insight</span>
                <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-accent)] font-medium leading-tight mb-6">
                Legal Knowledge <br/> <i className="font-serif italic text-[var(--color-primary)]">Simplified.</i>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Explore our curated collection of articles dissecting complex legal topics, clarifying youth rights, and sharing stories from the legal world.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-[72px] z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 hidden md:block">
        <div className="container max-w-6xl mx-auto px-6 overflow-x-auto">
          <div className="flex items-center justify-center gap-2 min-w-max">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                activeCategory === 'All'
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'text-gray-500 hover:text-[var(--color-accent)] hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  activeCategory === cat.name
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-gray-500 hover:text-[var(--color-accent)] hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading articles...</div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No articles found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/articles/${article.slug}`}
                  className="group flex flex-col gap-4"
                >
                  <div className="relative overflow-hidden aspect-[4/3] rounded-sm bg-gray-100">
                    {article.image ? (
						<img
							src={getImageUrl(article.image)}
							alt={article.title}
							className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
						/>
					) : (
						<div className="w-full aspect-[4/3] bg-gray-300 flex items-center justify-center">
							<img src="/favicon.png" alt="No Image" className="w-32 h-32 grayscale contrast-50 brightness-150" />
						</div>
					)}
                    {article.category && (
                      <div className="absolute top-4 left-4">
                         <span className="bg-white/90 backdrop-blur text-[var(--color-accent)] text-xs font-bold px-3 py-1 uppercase tracking-wide">
                            {article.category.name}
                         </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                      <div className="text-xs font-medium text-gray-400 flex items-center gap-2">
                          <span>{formatDate(article.createdAt)}</span>
                      </div>
                      <h2 className="font-serif text-2xl text-[var(--color-accent)] leading-snug group-hover:text-[var(--color-primary)] transition-colors duration-300">
                          {article.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {article.excerpt || 'Click to read more...'}
                      </p>
                      <span className="text-[var(--color-primary)] text-sm font-medium mt-2 group-hover:underline decoration-[var(--color-primary)] underline-offset-4">
                          Read Article
                      </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
