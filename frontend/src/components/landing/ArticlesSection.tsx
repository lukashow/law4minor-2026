import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { animate, stagger } from 'animejs';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  createdAt: string;
  category?: {
    id: string;
    name: string;
  };
}

export function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('http://localhost:3001/api/public/articles?perPage=3');
        if (response.ok) {
          const data = await response.json();
          setArticles(data.items || []);
        }
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      }
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current && articles.length > 0) {
            hasAnimated.current = true;

            animate('.article-card', {
              opacity: [0, 1],
              translateY: [40, 0],
              delay: stagger(150),
              easing: 'easeOutQuad',
              duration: 600,
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [articles]);

  const getImageUrl = (url?: string) => {
    if (!url) return '';
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
    <section ref={sectionRef} className="section bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <div className="hero-tagline flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-primary)]" />
              <span className="text-sm text-[var(--color-primary)] uppercase tracking-wider">Blog</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-accent)] mt-4">
              Latest Articles
            </h2>
            <p className="text-gray-600 mt-2">
              Stay informed with our latest legal insights and resources.
            </p>
          </div>
          <Link
            to="/articles"
            className="btn btn-outline group w-full md:w-auto justify-start md:justify-center px-0 md:px-4"
          >
            View All Articles
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No articles yet. Check back soon!</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                className="article-card group opacity-0"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
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
                      <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-medium rounded-full">
                        {article.category.name}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-xl font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{formatDate(article.createdAt)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
