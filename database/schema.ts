// PocketBase Collections Schema
// Run this via the PocketBase Admin Dashboard or API

export const collections = {
  // Users collection (extends built-in auth collection)
  users: {
    name: 'users',
    type: 'auth',
    schema: [
      { name: 'name', type: 'text', required: true },
      { name: 'avatar', type: 'file', maxSelect: 1 },
      { name: 'role', type: 'select', required: true, values: ['admin', 'editor', 'author', 'subscriber'] },
      { name: 'bio', type: 'text' },
    ],
  },

  // Categories collection
  categories: {
    name: 'categories',
    type: 'base',
    schema: [
      { name: 'name', type: 'text', required: true },
      { name: 'slug', type: 'text', required: true, unique: true },
      { name: 'description', type: 'text' },
      { name: 'parent', type: 'relation', collectionId: 'categories' },
    ],
  },

  // Tags collection
  tags: {
    name: 'tags',
    type: 'base',
    schema: [
      { name: 'name', type: 'text', required: true },
      { name: 'slug', type: 'text', required: true, unique: true },
    ],
  },

  // Posts collection (articles/blog posts)
  posts: {
    name: 'posts',
    type: 'base',
    schema: [
      { name: 'title', type: 'text', required: true },
      { name: 'slug', type: 'text', required: true, unique: true },
      { name: 'content', type: 'json', required: true }, // Editor.js blocks
      { name: 'excerpt', type: 'text' },
      { name: 'featured_image', type: 'file', maxSelect: 1 },
      { name: 'status', type: 'select', required: true, values: ['draft', 'published', 'scheduled', 'private'] },
      { name: 'author', type: 'relation', required: true, collectionId: 'users' },
      { name: 'categories', type: 'relation', collectionId: 'categories' },
      { name: 'tags', type: 'relation', collectionId: 'tags' },
      { name: 'published_at', type: 'date' },
      { name: 'meta_title', type: 'text' },
      { name: 'meta_description', type: 'text' },
    ],
  },

  // Pages collection
  pages: {
    name: 'pages',
    type: 'base',
    schema: [
      { name: 'title', type: 'text', required: true },
      { name: 'slug', type: 'text', required: true, unique: true },
      { name: 'content', type: 'json', required: true }, // Editor.js blocks
      { name: 'status', type: 'select', required: true, values: ['draft', 'published', 'private'] },
      { name: 'template', type: 'select', values: ['default', 'full-width', 'sidebar', 'landing'] },
      { name: 'featured_image', type: 'file', maxSelect: 1 },
      { name: 'parent', type: 'relation', collectionId: 'pages' },
      { name: 'order', type: 'number' },
      { name: 'meta_title', type: 'text' },
      { name: 'meta_description', type: 'text' },
    ],
  },

  // Media collection
  media: {
    name: 'media',
    type: 'base',
    schema: [
      { name: 'title', type: 'text' },
      { name: 'file', type: 'file', required: true, maxSelect: 1 },
      { name: 'alt_text', type: 'text' },
      { name: 'caption', type: 'text' },
      { name: 'uploaded_by', type: 'relation', collectionId: 'users' },
    ],
  },

  // Comments collection
  comments: {
    name: 'comments',
    type: 'base',
    schema: [
      { name: 'content', type: 'text', required: true },
      { name: 'post', type: 'relation', required: true, collectionId: 'posts' },
      { name: 'author', type: 'relation', collectionId: 'users' },
      { name: 'author_name', type: 'text' }, // For guest comments
      { name: 'author_email', type: 'email' }, // For guest comments
      { name: 'parent', type: 'relation', collectionId: 'comments' },
      { name: 'status', type: 'select', required: true, values: ['pending', 'approved', 'spam', 'trash'] },
    ],
  },

  // Settings collection
  settings: {
    name: 'settings',
    type: 'base',
    schema: [
      { name: 'key', type: 'text', required: true, unique: true },
      { name: 'value', type: 'json', required: true },
      { name: 'group', type: 'text' },
    ],
  },
};
