import { z } from 'zod';

export const pageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  content: z.any(), // JSON blocks from Editor.js
  template: z.string().default('default'),
  parent: z.string().optional(),
  order: z.number().int().default(0),
  status: z.enum(['draft', 'published']).default('draft'),
});

export const pageUpdateSchema = pageSchema.partial();

export type Page = z.infer<typeof pageSchema>;
export type PageUpdate = z.infer<typeof pageUpdateSchema>;
