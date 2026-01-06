import { Router, Request, Response } from 'express';
import prisma from '../services/prisma';

const router = Router();

// Get all comments
router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, articleId } = req.query;
    const where: any = {};
    if (status) where.status = status as string;
    if (articleId) where.articleId = articleId as string;
    
    // Note: Comments model not in current schema, returning empty for now
    res.json({ items: [], totalItems: 0, message: 'Comments feature pending schema update' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch comments' });
  }
});

export default router;
