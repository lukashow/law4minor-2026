// Fetch articles and team at BUILD TIME for homepage
// Strip backend URL from images so they work as relative paths
function processImageUrl(url?: string): string | undefined {
  if (!url) return undefined
  // Remove http://localhost:3001 prefix if present
  return url.replace(/^https?:\/\/localhost:3001/, '')
}

export default async function data() {
  let articles: any[] = []
  let team: any[] = []
  
  try {
    const response = await fetch('http://localhost:3001/api/public/articles?perPage=3')
    if (response.ok) {
      const result = await response.json()
      const rawArticles = result.items || result || []
      // Process image URLs to be relative
      articles = rawArticles.map((article: any) => ({
        ...article,
        image: processImageUrl(article.image),
      }))
    }
  } catch (err) {
    console.warn('[SSG] Homepage articles fetch failed:', err)
  }

  try {
    const response = await fetch('http://localhost:3001/api/public/team')
    if (response.ok) {
      const rawTeam = await response.json()
      // Process avatar URLs to be relative
      team = (Array.isArray(rawTeam) ? rawTeam : []).map((member: any) => ({
        ...member,
        avatar: processImageUrl(member.avatar),
      }))
    }
  } catch (err) {
    console.warn('[SSG] Team fetch failed:', err)
  }

  return {
    title: 'Home',
    description: 'Law4Minor empowers minors with legal knowledge. Learn about your rights as a minor in Malaysia through our articles, events, and resources.',
    articles,
    team,
  }
}
