import { Request, Response, NextFunction } from 'express';
import prisma from './prisma';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: 'ADMIN' | 'EDITOR' | 'WRITER';
        firstName: string;
        lastName: string;
      };
    }
  }
}

// Auth middleware - extracts user from token/header
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // For now, check for user ID in header (in production, verify JWT)
    const token = req.headers.authorization?.replace('Bearer ', '');
    const userId = req.headers['x-user-id'] as string;
    
    if (!userId && !token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: userId || token },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
      },
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid authentication' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};

// Optional auth - doesn't fail if no auth
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          role: true,
          firstName: true,
          lastName: true,
        },
      });
      
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    next();
  }
};

// Role-based access control
export const requireRole = (...roles: ('ADMIN' | 'EDITOR' | 'WRITER')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

// Check if user can edit article
export const canEditArticle = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const articleId = req.params.id;
  
  // Admin and Editor can edit any article
  if (req.user.role === 'ADMIN' || req.user.role === 'EDITOR') {
    return next();
  }
  
  // Writer can only edit their own articles
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { authorId: true },
    });
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    if (article.authorId !== req.user.id) {
      return res.status(403).json({ error: 'You can only edit your own articles' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify permissions' });
  }
};

// Check if user can publish/reject article (Editor or Admin only)
export const canPublishArticle = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  if (req.user.role !== 'ADMIN' && req.user.role !== 'EDITOR') {
    return res.status(403).json({ error: 'Only Editors and Admins can publish/reject articles' });
  }
  
  next();
};

// Check if user can change article author (Editor or Admin only)
export const canChangeAuthor = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  if (req.body.authorId && req.user.role !== 'ADMIN' && req.user.role !== 'EDITOR') {
    return res.status(403).json({ error: 'Only Editors and Admins can change article author' });
  }
  
  next();
};
