"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { animate, stagger } from 'animejs';

export function RecognitionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            animate('.recognition-item', {
              opacity: [0, 1],
              scale: [0.9, 1],
              delay: stagger(100),
              easing: 'easeOutQuad',
              duration: 500,
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const partners = [
    { name: 'Quality Education', logo: '/images/sdg/sdg4.png', alt: 'SDG 4: Quality Education' },
    { name: 'Reduced Inequalities', logo: '/images/sdg/sdg10.png', alt: 'SDG 10: Reduced Inequalities' },
    { name: 'Peace, Justice & Strong Institutions', logo: '/images/sdg/sdg16.png', alt: 'SDG 16: Peace, Justice and Strong Institutions' },
    { name: 'Partnerships for the Goals', logo: '/images/sdg/sdg17.png', alt: 'SDG 17: Partnerships for the Goals' },
  ];

  return (
    <section ref={sectionRef} className="py-12 bg-white border-y border-gray-100">
      <div className="container">
        <div className="text-center mb-8">
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            Recognitions & Partnerships
          </span>
		  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-4">
            Sustainability<br />for the Law.
          </h2>
        </div>
        <p className="text-center text-gray-600 w-full mx-auto mb-8">
          Our initiative aligns with the UN's Sustainable Development Goals. <br/>We are actively working with the Ministry of Education (MOE) and other public sector entities.
        </p>
        <div className="flex flex-wrap justify-center items-start gap-4 md:gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="recognition-item flex flex-col items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 opacity-0 group cursor-default"
            >
              <div className="w-32 h-32 relative flex items-center justify-center transition-transform group-hover:-translate-y-1">
                 <Image 
                    src={partner.logo} 
                    alt={partner.alt} 
                    width={128}
                    height={128}
                    className="w-full h-full object-contain drop-shadow-sm" 
                 />
              </div>
              <span className="text-gray-700 font-medium text-sm text-center max-w-37.5">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
