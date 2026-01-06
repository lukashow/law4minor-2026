// Fetch events at BUILD TIME
// Strip backend URL from images so they work as relative paths
function processImageUrl(url?: string): string | undefined {
  if (!url) return undefined
  // Remove http://localhost:3001 prefix if present
  return url.replace(/^https?:\/\/localhost:3001/, '')
}

export default async function data() {
  let events: any[] = []
  
  try {
    const response = await fetch('http://localhost:3001/api/public/events')
    if (response.ok) {
      const rawEvents = await response.json()
      // Process image URLs to be relative
      events = (Array.isArray(rawEvents) ? rawEvents : []).map((event: any) => ({
        ...event,
        banner: processImageUrl(event.banner),
      }))
    }
  } catch (err) {
    console.warn('[SSG] Events fetch failed:', err)
  }

  return {
    title: 'Events',
    description: 'Discover workshops, webinars, and community gatherings designed to empower you with legal knowledge.',
    events,
  }
}
