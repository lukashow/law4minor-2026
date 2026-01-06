import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  category?: string;
  banner?: string;
  description: string;
}

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('http://localhost:3001/api/public/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const categories = ['All', ...new Set(events.map(e => e.category || 'General').filter(Boolean))];

  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(e => (e.category || 'General') === filter);

  const getImageUrl = (url?: string) => {
    if (!url) return '/images/placeholder.png';
    if (url.startsWith('http')) return url;
    return `http://localhost:3001${url}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
    };
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-paper)]">
      <SEO 
        title="Events"
        description="Discover workshops, webinars, and community gatherings designed to empower you with legal knowledge. Join Law4Minor events."
        url="/events"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-[var(--color-accent)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

        <div className="container relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-xs font-semibold uppercase tracking-widest mb-4">
            Upcoming Events
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Connect, Learn, & Engage
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover workshops, webinars, and community gatherings designed to empower you with legal knowledge.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-gray-200 bg-white sticky top-[72px] z-20 shadow-sm/50">
        <div className="container">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-[var(--color-accent)] text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading events...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No events found. Check back soon!</div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-8">
              {filteredEvents.map((event) => {
                const dateInfo = formatDate(event.startDate);
                return (
                  <div 
                    key={event.id}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
                  >
                    {/* Date Badge Desktop */}
                    <div className="hidden md:flex md:w-32 md:bg-[var(--color-accent)] md:flex-col md:items-center md:justify-center md:text-white md:p-4 md:shrink-0">
                      <span className="text-3xl font-serif font-bold">{dateInfo.day}</span>
                      <span className="text-sm font-medium uppercase tracking-wider">{dateInfo.month}</span>
                    </div>

                    {/* Mobile Date Badge */}
                    <div className="md:hidden absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm text-center z-10">
                       <p className="font-bold text-[var(--color-accent)] leading-none text-xl">{dateInfo.day}</p>
                       <p className="text-[10px] uppercase font-bold text-gray-500">{dateInfo.month}</p>
                    </div>

                    {/* Image */}
                    <div className="md:w-64 h-48 md:h-auto shrink-0 overflow-hidden relative">
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                       <img 
                        src={getImageUrl(event.banner)} 
                        alt={event.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                       />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
                          {event.category || 'Event'}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatTime(event.startDate)}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-[var(--color-accent)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1.5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                        
                        <button className="btn btn-outline py-2 px-5 text-sm group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)]">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
             <p className="text-gray-500">More events coming soon. <Link to="/contact" className="text-[var(--color-primary)] hover:underline">Subscribe to newsletter</Link> to get notified.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
