"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { createTimeline } from 'animejs';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Animate hero elements
    createTimeline()
	  .add('.hero-tagline', {
			opacity: [0, 1],
			translateY: [50, 0],
			duration: 1000,
		})
      .add('.hero-title', {
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
      })
      .add('.hero-subtitle', {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
      }, '-=600')
      .add('.hero-buttons', {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
      }, '-=400')
      .add('.hero-features', {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
      }, '-=300')
      .add('.hero-image', {
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 800,
      }, '-=800');
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen h-fit flex items-center bg-accent overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10 pt-24 pb-12 px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="hero-tagline flex items-center gap-2 mb-6">
              <span className="w-8 h-0.5 bg-primary" />
              <span className="text-sm text-white/70 uppercase tracking-wider">Youth Legal Education</span>
            </div>
            
            <h1 className="hero-title font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 opacity-0">
              Empowering Youth Through{' '}
              <span className="text-primary">Legal Literacy.</span>
            </h1>

            <p className="hero-subtitle text-lg text-white/80 max-w-xl mb-8 opacity-0">
              At Law4Minor, we aim to target the underlying cause, focusing our urgent action towards education and awareness to help at-risk youth find community.
            </p>

            <div className="hero-buttons flex flex-wrap gap-4 mb-12 opacity-0">
              <a href="/about" className="btn btn-primary">
                Learn More About Us
              </a>
              <a href="/articles" className="btn btn-secondary">
                Explore Articles
              </a>
            </div>

            {/* Features */}
            <div className="hero-features grid sm:grid-cols-2 gap-6 opacity-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="leading-relaxed">
                  <h3 className="font-semibold text-white mb-1">Education First</h3>
                  <p className="text-sm text-white/60">Increase legal literacy in our youth</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="leading-relaxed">
                  <h3 className="font-semibold text-white mb-1">Community Support</h3>
                  <p className="text-sm text-white/60">Help families and communities understand</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="hero-image relative hidden lg:block opacity-0 w-[80%]">
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-t from-primary to-transparent z-10" />
              <Image
                src="/images/hero-image.webp"
                alt="Legal Education"
                width={600}
                height={750}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
