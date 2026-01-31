"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { animate, stagger } from 'animejs';

interface TeamMember {
  id: string;
  name: string;
  displayName: string;
  avatar?: string;
  description?: string;
  link?: string;
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
    return url;
  };

  const getName = (member: TeamMember) => {
    return member.displayName || member.name;
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
                  <Image
                    src={getImageUrl(member.avatar) || '/favicon.png'}
                    alt={getName(member)}
                    width={300}
                    height={400}
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
                <p className="text-sm text-gray-500">Team Member</p>
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
              <Image
                src={getImageUrl(selectedMember.avatar) || '/favicon.png'}
                alt={getName(selectedMember)}
                width={500}
                height={256}
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
                Team Member
              </p>

              {selectedMember.description && (
                <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                  {selectedMember.description}
                </p>
              )}

              {/* Profile Link */}
              {selectedMember.link && (
                <div className="mt-6">
                  <a
                    href={selectedMember.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Full Profile
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
