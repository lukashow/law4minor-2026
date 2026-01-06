import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email('Invalid email'),
  username: z.string().min(3).max(50),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  passwordConfirm: z.string(),
  name: z.string().max(100).optional(),
  avatar: z.string().optional(),
  role: z.enum(['admin', 'editor', 'author', 'subscriber']).default('subscriber'),
  bio: z.string().max(500).optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm'],
});

export const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).max(50).optional(),
  name: z.string().max(100).optional(),
  avatar: z.string().optional(),
  role: z.enum(['admin', 'editor', 'author', 'subscriber']).optional(),
  bio: z.string().max(500).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export type User = z.infer<typeof userSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
