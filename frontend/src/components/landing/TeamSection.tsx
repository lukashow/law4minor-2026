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

interface TeamSectionProps {
  team?: TeamMember[];
}

export function TeamSection({ team = [] }: TeamSectionProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

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
    if (!url) return '';
    // Image URLs are already processed to be relative paths
    if (url.startsWith('http')) return url;
    return url;
  };

  const getName = (member: TeamMember) => {
    return member.displayName || `${member.firstName} ${member.lastName}`;
  };

  return (
    <>
      <section ref={sectionRef} className="section bg-[var(--color-accent)]">
        <div className="container">
          <div className="mb-12">
            <span className="text-[var(--color-primary)] text-sm font-medium uppercase tracking-wider">Our Team</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-4">
              From Youth, and To Youth
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.length > 0 && team.map((member) => (
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
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent" />
            </div>

            {/* Content */}
            <div className="px-6 pb-6 -mt-8 relative">
              <h3 className="font-serif text-2xl font-bold text-[var(--color-accent)]">
                {getName(selectedMember)}
              </h3>
              <p className="text-[var(--color-primary)] font-medium">
                {selectedMember.teamRole || 'Team Member'}
              </p>

              {selectedMember.bio && (
                <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                  {selectedMember.bio}
                </p>
              )}

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {selectedMember.publicEmail && (
                  <a
                    href={`mailto:${selectedMember.publicEmail}`}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                )}
                {selectedMember.linkedin && (
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#0077B5] hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {selectedMember.instagram && (
                  <a
                    href={selectedMember.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#E4405F] hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
