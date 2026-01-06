"use client";

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const services = [
  {
    title: 'Online Engagement',
    description: 'Through engaging and informative legal summaries and witty reels on our Instagram page, you can learn something new about the law.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Articles',
    description: 'Enjoy 5-minute-reads on the latest news, case studies, and once again, the law to dive deeper.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    title: 'Community Outreach',
    description: 'Partnering with other organisations, schools, and firms, we look forward to bringing the fun to you with events and campaigns.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            animate('.service-card', {
              opacity: [0, 1],
              translateY: [40, 0],
              delay: stagger(150),
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
    <section ref={sectionRef} className="section bg-[var(--color-accent)]">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-[var(--color-primary-light)] text-sm font-medium uppercase tracking-wider">Our Programs & Resources</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">
            Bringing the law to you<br />in engaging way.
          </h2>
          <p className="text-white/90 w-full">
            At Law4Minor, you can understand more about the law with our quick summaries, <br/>long articles, and informative videos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white/5 hover:bg-white/10 rounded-2xl p-8 transition-all duration-300 opacity-0"
            >
              <div className="w-16 h-16 rounded-xl bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] group-hover:text-[var(--color-accent)] mb-6 transition-all">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-white group-hover:text-[var(--color-primary-light)] mb-3 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/80 group-hover:text-white text-sm leading-relaxed transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/articles" className="btn btn-primary">
            View All Resources
          </a>
        </div>
      </div>
    </section>
  );
}
