"use client";

import { Icon } from '@iconify/react';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/articles', label: 'Articles' },
    { path: '/contact', label: 'Contact' },
  ];

  const legalLinks = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
  ];

  const socialLinks = [
    {
      href: 'https://instagram.com/law4minor',
      label: 'Instagram',
      icon: (
        <Icon icon="simple-icons:instagram" className="w-5 h-5" />
      ),
    },
    {
      href: 'https://tiktok.com/@law4minor',
      label: 'TikTok',
      icon: (
        <Icon icon="simple-icons:tiktok" className="w-5 h-5" />
      ),
    }
  ];

  return (
    <footer className="bg-[var(--color-accent)] text-white">
      <div className="container section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <a href="/" className="nav-item flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Law4Minor Logo" width={120} height={48} className="h-12 w-auto" />
            </a>
			<h4 className="font-serif text-lg font-semibold mb-4">Law4Minor</h4>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Educating youth about laws and legal rights through community engagement and accessible resources.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[var(--color-accent)] transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Legal</h4>
            <ul className="flex flex-col gap-4">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
			<h4 className="font-serif text-lg font-semibold mb-4 pt-12">Contact Us</h4>
			<ul className="flex flex-col gap-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@law4minor.org" className="hover:text-white transition-colors">
                  contact@law4minor.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Malaysia</span>
              </li>
            </ul>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 !pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm text-center">
            © 2024-{currentYear} Law4Minor. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
