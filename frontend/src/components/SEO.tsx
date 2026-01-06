import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const SITE_NAME = 'Law4Minor';
const DEFAULT_DESCRIPTION = 'Empowering minors with legal knowledge. Learn about your rights, stay informed, and get the legal guidance you need.';
const DEFAULT_IMAGE = '/og-image.png';
const SITE_URL = 'https://law4minor.my'; // Update with actual domain

// Helper to set or update meta tag
function setMetaTag(attribute: 'name' | 'property', attrValue: string, content: string) {
  let meta = document.querySelector(`meta[${attribute}="${attrValue}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, attrValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

// Helper to set or update link tag
function setLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function SEO({ 
  title, 
  description = DEFAULT_DESCRIPTION, 
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  article,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Basic meta tags
    setMetaTag('name', 'description', description);
    setLinkTag('canonical', fullUrl);

    // Open Graph
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', fullImage);
    setMetaTag('property', 'og:url', fullUrl);

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImage);

    // Article specific
    if (type === 'article' && article) {
      if (article.publishedTime) {
        setMetaTag('property', 'article:published_time', article.publishedTime);
      }
      if (article.author) {
        setMetaTag('property', 'article:author', article.author);
      }
      // Note: Multiple tags would need special handling
    }

    // Cleanup function to reset on unmount (optional, for SPA behavior)
    return () => {
      // We don't remove tags as they persist for SEO benefit
    };
  }, [fullTitle, description, fullUrl, fullImage, type, article]);

  return null; // This component doesn't render anything
}
