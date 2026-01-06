// Fetch articles and categories at BUILD TIME
// Strip backend URL from images so they work as relative paths
function processImageUrl(url?: string): string | undefined {
  if (!url) return undefined
  // Remove http://localhost:3001 prefix if present
  return url.replace(/^https?:\/\/localhost:3001/, '')
}

export default async function data() {
  let articles: any[] = []
  let categories: any[] = []
  
  try {
    const articlesRes = await fetch('http://localhost:3001/api/public/articles')
    if (articlesRes.ok) {
      const result = await articlesRes.json()
      // API returns {items: [...]} or just [...]
      const rawArticles = result.items || result || []
      // Process image URLs to be relative
      articles = rawArticles.map((article: any) => ({
        ...article,
        image: processImageUrl(article.image),
      }))
    }
  } catch (err) {
    console.warn('[SSG] Articles fetch failed:', err)
  }
  
  try {
    const categoriesRes = await fetch('http://localhost:3001/api/public/categories')
    if (categoriesRes.ok) {
      const result = await categoriesRes.json()
      categories = Array.isArray(result) ? result : (result.items || result || [])
    }
  } catch (err) {
    console.warn('[SSG] Categories fetch failed:', err)
  }

  return {
    title: 'Articles',
    description: 'Explore our curated collection of articles on legal topics, youth rights, and stories from the legal world.',
    articles,
    categories,
  }
}
