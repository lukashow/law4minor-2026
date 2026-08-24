"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { animate, stagger } from 'animejs';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    // Get current path for client-side
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navbar on mount
    animate('.nav-item', {
      opacity: [0, 1],
      translateY: [-10, 0],
      delay: stagger(100),
      easing: 'easeOutQuad',
      duration: 500,
    });
  }, []);

  const isActive = (path: string) => currentPath === path;

  const isLightPage = ['/articles', '/contact', '/privacy', '/terms', '/events'].some(path => currentPath.startsWith(path));
  const shouldUseDarkText = !isScrolled && isLightPage;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/articles', label: 'Articles' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 ${
        isScrolled
          ? 'bg-accent/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="nav-item flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Law4Minor Logo" 
            width={120}
            height={40}
            className={`h-10 w-auto transition-all duration-300`} 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`nav-item text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-accent/80'
                  : shouldUseDarkText 
                    ? 'text-accent hover:text-white/80' 
                    : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a 
            href="/contact" 
            className={`nav-item btn ${shouldUseDarkText && !isScrolled ? 'btn-outline' : 'btn-primary'}`}
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden p-2 transition-colors ${shouldUseDarkText ? 'text-accent' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-paper shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="container py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`text-sm font-medium py-2 transition-colors ${
                isActive(link.path)
                  ? 'text-primary'
                  : 'text-accent hover:text-primary'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            className="btn btn-primary w-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  );
}
