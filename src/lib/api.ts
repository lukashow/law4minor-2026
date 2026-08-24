// WordPress REST API integration for law4minor.org

export const WP_API_URL = "https://admin.law4minor.org/wp-json/wp/v2";

// ===== Type Definitions =====

export interface WPPost {
  id: number;
  date: string;
  date_gmt: string;
  slug: string;
  status: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    author?: WPAuthor[];
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface WPAuthor {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    "24": string;
    "48": string;
    "96": string;
  };
  mpp_avatar?: {
    "24"?: string;
    "48"?: string;
    "96"?: string;
    "150"?: string;
    "300"?: string;
    full?: string;
    errors?: any;
  };
}

export interface WPMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: { rendered: string };
  author: number;
  caption: { rendered: string };
  alt_text: string;
  media_type: string;
  mime_type: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        source_url: string;
      };
    };
  };
}

export interface WPTerm {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WPPage {
  id: number;
  date: string;
  slug: string;
  status: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  featured_media: number;
}

// ===== Transformed Types (for app consumption) =====

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  createdAt: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags?: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface TeamMember {
  id: string;
  name: string;
  displayName: string;
  avatar?: string;
  description?: string;
  link?: string;
}

// ===== Helper Functions =====

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "...")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function transformPost(post: WPPost): Article {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const author = post._embedded?.author?.[0];
  const categories = post._embedded?.["wp:term"]?.[0] || [];
  const tags = post._embedded?.["wp:term"]?.[1] || [];

  return {
    id: String(post.id),
    slug: post.slug,
    title: post.title.rendered,
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    image: featuredMedia?.source_url,
    createdAt: post.date,
    category: categories[0]
      ? {
          id: String(categories[0].id),
          name: categories[0].name,
          slug: categories[0].slug,
        }
      : undefined,
    author: author
      ? {
          id: String(author.id),
          name: author.name,
          avatar:
            author.mpp_avatar?.["96"] ||
            author.mpp_avatar?.full ||
            author.avatar_urls?.["96"],
        }
      : undefined,
    tags: tags.map((tag) => ({
      id: String(tag.id),
      name: tag.name,
      slug: tag.slug,
    })),
  };
}

function transformCategory(cat: WPCategory): Category {
  return {
    id: String(cat.id),
    name: cat.name,
    slug: cat.slug,
    count: cat.count,
  };
}

function transformUser(user: WPAuthor): TeamMember {
  // Get avatar - prefer mpp_avatar if available
  let avatar: string | undefined;
  if (user.mpp_avatar && !user.mpp_avatar.errors) {
    avatar =
      user.mpp_avatar["300"] || user.mpp_avatar.full || user.mpp_avatar["150"];
  } else {
    avatar = user.avatar_urls?.["96"];
  }

  return {
    id: String(user.id),
    name: user.name,
    displayName: user.name,
    avatar,
    description: user.description || undefined,
    link: user.link,
  };
}

// ===== API Functions =====

/**
 * Fetch posts from WordPress with optional filters
 */
export async function fetchPosts(
  options: {
    perPage?: number;
    page?: number;
    category?: number;
    search?: string;
    slug?: string;
  } = {},
): Promise<Article[]> {
  const params = new URLSearchParams();
  params.set("_embed", "true");

  if (options.perPage) params.set("per_page", String(options.perPage));
  if (options.page) params.set("page", String(options.page));
  if (options.category) params.set("categories", String(options.category));
  if (options.search) params.set("search", options.search);
  if (options.slug) params.set("slug", options.slug);

  try {
    const res = await fetch(`${WP_API_URL}/posts?${params.toString()}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`[WP API] Posts fetch failed: ${res.status}`);
      return [];
    }

    const posts: WPPost[] = await res.json();
    return posts.map(transformPost);
  } catch (err) {
    console.error("[WP API] Posts fetch error:", err);
    return [];
  }
}

/**
 * Fetch a single post by slug
 */
export async function fetchPostBySlug(slug: string): Promise<Article | null> {
  const posts = await fetchPosts({ slug, perPage: 1 });
  return posts[0] || null;
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${WP_API_URL}/categories?per_page=100`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`[WP API] Categories fetch failed: ${res.status}`);
      return [];
    }

    const categories: WPCategory[] = await res.json();
    // Filter out "Uncategorized" and categories with no posts
    return categories
      .filter((cat) => cat.slug !== "uncategorized" && cat.count > 0)
      .map(transformCategory);
  } catch (err) {
    console.error("[WP API] Categories fetch error:", err);
    return [];
  }
}

/**
 * Fetch users (for team section)
 * Note: WordPress REST API only exposes users who have authored posts by default
 */
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch(`${WP_API_URL}/users?per_page=100`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(`[WP API] Users fetch failed: ${res.status}`);
      return [];
    }

    const users: WPAuthor[] = await res.json();
    // Filter out admin users and transform
    return users
      .filter((user) => user.slug !== "admin" && user.name !== "admin")
      .map(transformUser);
  } catch (err) {
    console.error("[WP API] Users fetch error:", err);
    return [];
  }
}

/**
 * Fetch a page by slug
 */
export async function fetchPage(slug: string): Promise<WPPage | null> {
  try {
    const res = await fetch(
      `${WP_API_URL}/pages?slug=${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      console.error(`[WP API] Page fetch failed: ${res.status}`);
      return null;
    }

    const pages: WPPage[] = await res.json();
    return pages[0] || null;
  } catch (err) {
    console.error("[WP API] Page fetch error:", err);
    return null;
  }
}

// Legacy exports for backwards compatibility during transition
export const BACKEND_URL = WP_API_URL;
export function processImageUrl(url?: string): string | undefined {
  return url;
}
