import { useState } from 'react'
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
  author?: { firstName: string; lastName: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function Page() {
  const pageContext = usePageContext() as any
  const articles: Article[] = pageContext.data?.articles || []
  const categories: Category[] = pageContext.data?.categories || []
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = articles.filter(article => {
    const matchesCategory = !activeCategory || article.category?.name === activeCategory
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getImageUrl = (url?: string) => {
    if (!url) return '/images/placeholder.png'
    if (url.startsWith('http')) return url
    return url
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-paper)] pt-32 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-[var(--color-primary)] text-sm font-medium uppercase tracking-wider">Knowledge Hub</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-accent)] mt-2 mb-6">
              Articles
            </h1>
            <p className="text-lg text-gray-600">
              Explore our curated collection of articles on legal topics for youth.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white border-b sticky top-16 z-30">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  !activeCategory
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.name
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Icon icon="mdi:magnify" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <Icon icon="mdi:file-document-outline" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">No articles found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
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
  )
}
