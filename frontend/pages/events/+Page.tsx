import { usePageContext } from 'vike-react/usePageContext'
import { Icon } from '@iconify/react'

interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  location: string;
  category?: string;
  banner?: string;
  description: string;
  attendLink: string;
}

export default function Page() {
  const pageContext = usePageContext() as any
  const events: Event[] = pageContext.data?.events || []

  const getImageUrl = (url?: string) => {
    if (!url) return '/images/placeholder.png';
    if (url.startsWith('http')) return url;
    return url; // Already relative path from API
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[var(--color-paper)] pt-32 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-[var(--color-primary)] text-sm font-medium uppercase tracking-wider">Upcoming</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-accent)] mt-2 mb-6">
              Events & Programs
            </h1>
            <p className="text-lg text-gray-600">
              Join our workshops, webinars, and community gatherings designed to empower you with legal knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section bg-[var(--color-paper)]">
        <div className="container">
          {events.length === 0 ? (
            <div className="text-center py-16">
              <Icon icon="mdi:calendar-blank" className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">No events found</h3>
              <p className="text-gray-400 mt-2">Check back later for upcoming events.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                    {event.banner ? (
                      <img 
                        src={getImageUrl(event.banner)} 
                        alt={event.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <img src="/favicon.png" alt="No Image" className="w-16 h-16 grayscale contrast-50 brightness-150" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Icon icon="mdi:calendar" className="w-4 h-4" />
                      <span>{formatDate(event.startDate)}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[var(--color-accent)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                      {event.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Icon icon="mdi:map-marker" className="w-4 h-4" />
                        {event.location}
                      </div>
                      
                      <a href={event.attendLink} className="btn btn-outline py-2 px-5 text-sm group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)]">
                        Register Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
