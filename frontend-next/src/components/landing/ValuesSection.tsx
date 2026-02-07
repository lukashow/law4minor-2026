"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { animate, stagger } from 'animejs';

const values = [
  {
    title: 'Justice',
    description: 'Advocating for fair treatment and equal rights for all youth.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: 'Integrity',
    description: 'Maintaining honesty and transparency in all our actions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'Using creative methods to make legal education accessible.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Transparency',
    description: 'Open communication about our work and its impact.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            animate('.value-card', {
              opacity: [0, 1],
              translateX: [-30, 0],
              delay: stagger(200),
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
  }, []);

  return (
    <section ref={sectionRef} className="section bg-gray-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/values-bg.webp"
          alt=""
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/80 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="hero-tagline flex items-center gap-2 mb-6">
              <span className="w-8 h-0.5 bg-primary" />
              <span className="text-sm text-white/70 uppercase tracking-wider">Our Values</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              Our Pillars Are Built On <strong className="text-primary">Trust</strong> and <strong className="text-primary">Excellence</strong>
            </h2>
            <p className="text-white/70 text-lg mb-8">
              As a grassroots youth organisation, our belief is in education. By using the methods of education and community support, we will increase legal literacy in our youth.
            </p>

            {/* Values List */}
            <div className="flex flex-col gap-y-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="value-card flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group opacity-0"
                >
                  <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center text-white group-hover:bg-accent group-hover:text-primary transition-all">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white">{value.title}</h3>
                    <p className="text-sm text-white/60">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Decorative */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4 grid-col-gap-8">
                <div className="">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src="/images/values-team-1.webp"
                      alt="Team collaboration"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-4/3 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/values-team-2.webp"
                      alt="Legal books"
                      width={300}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="aspect-4/3 rounded-2xl overflow-hidden">
                    <Image
                      src="/images/values-team-3.webp"
                      alt="Education"
                      width={300}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src="/images/values-team-4.webp"
                      alt="Community"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
