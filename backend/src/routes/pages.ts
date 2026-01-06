import { Router, Request, Response } from 'express';
import prisma from '../services/prisma';

const router = Router();

// Get all pages
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = '1', perPage = '10' } = req.query;
    const skip = (Number(page) - 1) * Number(perPage);
    
    const [pages, total] = await Promise.all([
      prisma.page.findMany({
        skip,
        take: Number(perPage),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.page.count(),
    ]);
    
    res.json({
      items: pages,
      page: Number(page),
      perPage: Number(perPage),
      totalItems: total,
      totalPages: Math.ceil(total / Number(perPage)),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch pages' });
  }
});

// Get single page by slug
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: req.params.slug },
    });
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(404).json({ error: 'Page not found' });
  }
});

// Get single page by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const page = await prisma.page.findUnique({
      where: { id: req.params.id },
    });
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(404).json({ error: 'Page not found' });
  }
});

// Create page
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, slug, content } = req.body;
    const pageSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const page = await prisma.page.create({
      data: {
        title,
        slug: pageSlug,
        content: content || {},
      },
    });
    res.status(201).json(page);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to create page' });
  }
});

// Update page
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, slug, content } = req.body;
    const page = await prisma.page.update({
      where: { id: req.params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(content && { content }),
      },
    });
    res.json(page);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update page' });
  }
});

// Delete page
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.page.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to delete page' });
  }
});

export default router;
