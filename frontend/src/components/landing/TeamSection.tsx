import { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatar?: string;
  teamRole?: string;
  bio?: string;
  publicEmail?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export function TeamSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const response = await fetch('http://localhost:3001/api/public/team');
        if (response.ok) {
          const data = await response.json();
          setTeam(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch team:', err);
      }
    }
    fetchTeam();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current && team.length > 0) {
            hasAnimated.current = true;

            animate('.team-card', {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: stagger(100),
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
  }, [team]);

  const getImageUrl = (url?: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80';
    if (url.startsWith('http')) return url;
    return `http://localhost:3001${url}`;
  };

  const getName = (member: TeamMember) => {
    return member.displayName || `${member.firstName} ${member.lastName}`;
  };

  // Use fallback team if no team members from API
  const fallbackTeam: TeamMember[] = [
    { id: '1', firstName: 'Senior', lastName: 'Advisor', teamRole: 'Legal Consultant', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', bio: 'Experienced legal consultant with expertise in youth law.' },
    { id: '2', firstName: 'Program', lastName: 'Lead', teamRole: 'Education Director', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', bio: 'Leading educational initiatives for legal awareness.' },
    { id: '3', firstName: 'Content', lastName: 'Creator', teamRole: 'Media Specialist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', bio: 'Creating engaging content to simplify legal concepts.' },
    { id: '4', firstName: 'Community', lastName: 'Lead', teamRole: 'Outreach Coordinator', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80', bio: 'Building bridges between youth and legal resources.' },
  ];

  const displayTeam = team.length > 0 ? team : fallbackTeam;

  return (
    <>
      <section ref={sectionRef} className="section bg-[var(--color-accent)]">
        <div className="container">
          <div className="mb-12">
            <span className="text-[var(--color-primary)] text-sm font-medium uppercase tracking-wider">Our Team</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-4">
              Meet The People Behind Law4Minor
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {displayTeam.map((member) => (
              <div 
                key={member.id} 
                className="team-card group cursor-pointer opacity-0"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={getImageUrl(member.avatar)}
                    alt={getName(member)}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Click to view hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 text-[var(--color-accent)] px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                      View Profile
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[var(--color-primary)]">{getName(member)}</h3>
                <p className="text-sm text-gray-500">{member.teamRole || 'Team Member'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Modal */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Avatar */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={getImageUrl(selectedMember.avatar)}
                alt={getName(selectedMember)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="font-serif text-2xl font-bold text-white">{getName(selectedMember)}</h3>
                <p className="text-[var(--color-primary)] font-medium">{selectedMember.teamRole || 'Team Member'}</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6">
              {/* Bio */}
              {selectedMember.bio && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">About</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedMember.bio}</p>
                </div>
              )}

              {/* Email */}
              {selectedMember.publicEmail && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</h4>
                  <a 
                    href={`mailto:${selectedMember.publicEmail}`}
                    className="text-[var(--color-primary)] hover:underline flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {selectedMember.publicEmail}
                  </a>
                </div>
              )}

              {/* Social Links */}
              {(selectedMember.linkedin || selectedMember.twitter || selectedMember.facebook || selectedMember.instagram) && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Connect</h4>
                  <div className="flex gap-3">
                    {selectedMember.linkedin && (
                      <a 
                        href={selectedMember.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#0077b5] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {selectedMember.twitter && (
                      <a 
                        href={selectedMember.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#1da1f2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    )}
                    {selectedMember.facebook && (
                      <a 
                        href={selectedMember.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#1877f2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                    )}
                    {selectedMember.instagram && (
                      <a 
                        href={selectedMember.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
