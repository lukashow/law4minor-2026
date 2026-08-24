"use client";

import Image from 'next/image';

export function CTASection() {
  return (
    <section className="section relative overflow-hidden flex items-center min-h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/cta-background.webp" 
          alt="Legal Background" 
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Decorative Pattern - Optional, keeping it subtle */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10">
        <div className="w-full mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready To Make Some Changes?<br />
            Join Us Now!
          </h2>
          <p className="text-white/80 text-lg mb-8 w-full mx-auto">
            Join thousands of youth who are learning about their legal rights. <br/>Browse our articles, follow us on social media, or get in touch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/articles" className="btn btn-primary">
              Browse Articles
            </a>
            <a href="/contact" className="btn bg-transparent text-white border border-white/30 hover:bg-white hover:text-accent backdrop-blur-sm transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
    </section>
  );
}
