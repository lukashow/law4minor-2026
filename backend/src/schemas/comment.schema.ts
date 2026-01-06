import { z } from 'zod';

export const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(2000),
  post: z.string().min(1, 'Post ID is required'),
  parent: z.string().optional(),
});

export const commentUpdateSchema = z.object({
  content: z.string().min(1).max(2000).optional(),
  status: z.enum(['pending', 'approved', 'spam', 'trash']).optional(),
});

export type Comment = z.infer<typeof commentSchema>;
export type CommentUpdate = z.infer<typeof commentUpdateSchema>;
