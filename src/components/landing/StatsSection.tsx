"use client";

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

const stats: StatItem[] = [
  { value: 2, label: 'Years of Contribution', suffix: '+' },
  { value: 100, label: 'Youths Reached', suffix: 'K+' },
  { value: 50, label: 'Social Media Followers', suffix: '+' },
  { value: 5, label: 'Partner Organizations', suffix: '+' },
];

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-expo)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.round(eased * target);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    setHasAnimated(true);
    requestAnimationFrame(animate);
  }, [hasAnimated, target, duration]);

  return <>{count}</>;
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="section bg-paper">
      <div className="container">
        <div className="text-center mb-12">
          <span style={{ color: 'var(--color-primary)' }} className="text-sm font-medium uppercase tracking-wider">Our Impact</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-accent">
            Make Law Accessible<br />For Youth
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card text-center p-6 rounded-xl group transition-all shadow-md duration-300 bg-white/90 hover:bg-primary"
            >
              <div className="flex items-baseline justify-center">
                <span
                  className="stat-value font-serif text-4xl md:text-5xl lg:text-6xl font-bold transition-colors text-accent group-hover:text-white"
                >
                  {isVisible ? <AnimatedCounter target={stat.value} /> : 0}
                </span>
                {stat.suffix && (
                  <span className="font-serif text-2xl md:text-3xl font-bold text-primary group-hover:text-white">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="stat-label mt-2 text-sm md:text-base transition-colors text-gray-600 group-hover:text-white">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
