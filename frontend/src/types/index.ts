export interface Post {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  title: string;
  slug: string;
  content: any; // JSON content
  excerpt: string;
  featured_image: string;
  status: 'draft' | 'published' | 'scheduled' | 'private';
  published_at?: string;
  author: string;
  categories: string[];
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  expand?: {
    author?: User;
    categories?: Category[];
    tags?: Tag[];
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
}
