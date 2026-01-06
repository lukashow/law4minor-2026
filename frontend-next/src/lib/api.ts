// Backend URL from environment variable
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

// Process image URLs to strip backend host for relative paths
export function processImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
  // Remove the backend URL prefix to make paths relative
  const backendPattern = new RegExp(`^${BACKEND_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
  return url.replace(backendPattern, "").replace(/^https?:\/\/localhost:\d+/, "");
}
