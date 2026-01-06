import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  content: z.any(), // JSON blocks from Editor.js
  excerpt: z.string().max(500).optional(),
  featured_image: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  meta: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
});

export const postUpdateSchema = postSchema.partial();

export type Post = z.infer<typeof postSchema>;
export type PostUpdate = z.infer<typeof postUpdateSchema>;
