import { Router, Request, Response } from 'express';
import prisma from '../services/prisma';

const router = Router();

// Get all tags
router.get('/', async (req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { articles: true } },
      },
    });
    res.json(tags);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch tags' });
  }
});

// Get single tag
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const tag = await prisma.tag.findUnique({
      where: { id: req.params.id },
      include: { articles: true },
    });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(404).json({ error: 'Tag not found' });
  }
});

// Create tag
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const tag = await prisma.tag.create({
      data: { name },
    });
    res.status(201).json(tag);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to create tag' });
  }
});

// Update tag
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const tag = await prisma.tag.update({
      where: { id: req.params.id },
      data: { name },
    });
    res.json(tag);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update tag' });
  }
});

// Delete tag
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.tag.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to delete tag' });
  }
});

export default router;
