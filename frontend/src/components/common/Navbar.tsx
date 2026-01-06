import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { animate, stagger } from 'animejs';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  const isActive = (path: string) => location.pathname === path;

  // Paths where the navbar should have dark text by default (because they have light backgrounds)
  // Home and Events usually have dark hero sections (White text)
  // Articles, Contact, Privacy, Terms usually have light/white headers (Dark text)
  const isLightPage = ['/articles', '/contact', '/privacy', '/terms', '/events'].some(path => location.pathname.startsWith(path));
  
  // If scrolled, always use scrolled style (Dark BG + White Text)
  // If not scrolled:
  //   - Light Page -> Dark Text
  //   - Dark Page (Home/Evt) -> White Text
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
          ? 'bg-[var(--color-accent)]/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="nav-item flex items-center gap-2">
          {/* Use filter invert if we need dark logo, or assume logo is visible enough or switch src */}
          <img 
            src="/logo.png" 
            alt="Law4Minor Logo" 
            className={`h-10 w-auto transition-all duration-300`} 
            // Note: brightness-0 invert makes it white. brightness-0 invert-0 makes it black.
            // Assuming logo.png is essentially a shape that works well monochromatically.
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-item text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'text-[var(--color-primary)]'
                  : shouldUseDarkText 
                    ? 'text-[var(--color-accent)] hover:text-[var(--color-primary)]' 
                    : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link 
            to="/contact" 
            className={`nav-item btn ${shouldUseDarkText && !isScrolled ? 'btn-outline' : 'btn-primary'}`}
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden p-2 transition-colors ${shouldUseDarkText ? 'text-[var(--color-accent)]' : 'text-white'}`}
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
        className={`lg:hidden absolute top-full left-0 right-0 bg-[var(--color-paper)] shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="container py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium py-2 transition-colors ${
                isActive(link.path)
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-accent)] hover:text-[var(--color-primary)]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn btn-primary w-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
