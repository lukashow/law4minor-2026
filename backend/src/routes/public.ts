// Public API routes for the public-facing frontend
// These routes ONLY return published/approved content - no auth required, no filtering by status allowed

import { Router, Request, Response } from 'express';
import prisma from '../services/prisma';

const router = Router();

// Public articles - ONLY published articles
router.get('/articles', async (req: Request, res: Response) => {
  try {
    const { page = '1', perPage = '20', categoryId, tagSlug } = req.query;
    const skip = (Number(page) - 1) * Number(perPage);
    
    const where: any = { status: 'PUBLISHED' }; // Always only published
    if (categoryId) where.categoryId = categoryId as string;
    
    // Filter by tag if provided
    if (tagSlug) {
      where.tags = {
        some: {
          slug: tagSlug as string,
        },
      };
    }
    
    const [posts, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: Number(perPage),
        include: { 
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              displayName: true,
              avatar: true,
            }
          },
          category: true,
          tags: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.article.count({ where }),
    ]);
    
    const transformedPosts = posts.map(post => ({
      ...post,
      author: post.author ? {
        ...post.author,
        name: post.author.displayName || `${post.author.firstName} ${post.author.lastName}`,
      } : null,
    }));
    
    res.json({
      items: transformedPosts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems: total,
      totalPages: Math.ceil(total / Number(perPage)),
    });
  } catch (error: any) {
    console.error('Error fetching public articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Public single article by slug - ONLY if published
router.get('/articles/:slug', async (req: Request, res: Response) => {
  try {
    const post = await prisma.article.findFirst({
      where: { 
        slug: req.params.slug,
        status: 'PUBLISHED', // Always only published
      },
      include: { 
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            displayName: true,
            avatar: true,
          }
        },
        category: true,
        tags: true,
      },
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({
      ...post,
      author: post.author ? {
        ...post.author,
        name: post.author.displayName || `${post.author.firstName} ${post.author.lastName}`,
      } : null,
    });
  } catch (error) {
    res.status(404).json({ error: 'Article not found' });
  }
});

// Public events - only future events or ongoing events
router.get('/events', async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: 'asc' },
    });
    
    res.json(events);
  } catch (error) {
    console.error('Error fetching public events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Public team members
router.get('/team', async (req: Request, res: Response) => {
  try {
    const teamMembers = await prisma.user.findMany({
      where: { isTeamMember: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        displayName: true,
        avatar: true,
        teamRole: true,
        bio: true,
        twitter: true,
        linkedin: true,
      },
      orderBy: { firstName: 'asc' },
    });
    
    res.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// Public categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Public tags
router.get('/tags', async (req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

export default router;
