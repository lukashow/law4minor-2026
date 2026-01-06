import { Router, Request, Response } from 'express';
import prisma from '../services/prisma';
import { optionalAuth, authMiddleware, canEditArticle, canPublishArticle, canChangeAuthor } from '../services/auth';

const router = Router();

// Get all posts
router.get('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { page = '1', perPage = '20', status, categoryId, authorId } = req.query;
    const skip = (Number(page) - 1) * Number(perPage);
    
    const where: any = {};
    if (status) where.status = status as string;
    if (categoryId) where.categoryId = categoryId as string;
    if (authorId) where.authorId = authorId as string;
    
    // Writers can only see their own posts unless filtering by status PUBLISHED
    if (req.user?.role === 'WRITER' && status !== 'PUBLISHED') {
      where.authorId = req.user.id;
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
    
    // Transform author data for frontend compatibility
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
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch posts' });
  }
});

// Get post by slug (for public frontend)
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const post = await prisma.article.findFirst({
      where: { 
        slug: req.params.slug,
        status: 'PUBLISHED', // Only return published articles for public
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

// Get single post
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await prisma.article.findUnique({
      where: { id: req.params.id },
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
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({
      ...post,
      author: post.author ? {
        ...post.author,
        name: post.author.displayName || `${post.author.firstName} ${post.author.lastName}`,
      } : null,
    });
  } catch (error) {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Create post
router.post('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { title, slug, content, excerpt, image, status, authorId, categoryId, tagIds } = req.body;
    
    if (!title || !slug) {
      return res.status(400).json({ error: 'Title and slug are required' });
    }
    
    // Determine author
    let finalAuthorId = authorId;
    
    // If user is logged in, use their ID unless they're Editor/Admin and specified different author
    if (req.user) {
      if (!authorId || (req.user.role !== 'ADMIN' && req.user.role !== 'EDITOR')) {
        finalAuthorId = req.user.id;
      }
    }
    
    // If still no author, get first user
    if (!finalAuthorId) {
      const firstUser = await prisma.user.findFirst();
      if (!firstUser) {
        return res.status(400).json({ error: 'No users exist. Create a user first.' });
      }
      finalAuthorId = firstUser.id;
    }
    
    // Verify author exists
    const authorExists = await prisma.user.findUnique({ where: { id: finalAuthorId } });
    if (!authorExists) {
      return res.status(400).json({ error: 'Author not found' });
    }
    
    // Writers can only create DRAFT articles
    let finalStatus = status || 'DRAFT';
    if (req.user?.role === 'WRITER' && status === 'PUBLISHED') {
      finalStatus = 'DRAFT'; // Writers cannot publish directly
    }
    
    const post = await prisma.article.create({
      data: {
        title,
        slug,
        content: content || {},
        excerpt,
        image,
        status: finalStatus,
        authorId: finalAuthorId,
        categoryId: categoryId || null,
        ...(tagIds && tagIds.length > 0 && {
          tags: {
            connect: tagIds.map((id: string) => ({ id })),
          },
        }),
      },
      include: { author: true, category: true, tags: true },
    });
    res.status(201).json(post);
  } catch (error: any) {
    console.error('Error creating post:', error);
    res.status(400).json({ error: error.message || 'Failed to create post' });
  }
});

// Update post
router.put('/:id', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { title, slug, content, excerpt, image, status, categoryId, tagIds, authorId } = req.body;
    const articleId = req.params.id;
    
    // Get current article
    const currentArticle = await prisma.article.findUnique({
      where: { id: articleId },
      select: { authorId: true, status: true },
    });
    
    if (!currentArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Check permissions
    if (req.user) {
      // Writers can only edit their own articles
      if (req.user.role === 'WRITER' && currentArticle.authorId !== req.user.id) {
        return res.status(403).json({ error: 'You can only edit your own articles' });
      }
      
      // Writers cannot change author or publish
      if (req.user.role === 'WRITER') {
        if (authorId && authorId !== currentArticle.authorId) {
          return res.status(403).json({ error: 'You cannot change the article author' });
        }
        if (status === 'PUBLISHED' || status === 'REJECTED') {
          return res.status(403).json({ error: 'Only Editors and Admins can publish or reject articles' });
        }
      }
    }
    
    const post = await prisma.article.update({
      where: { id: articleId },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(content !== undefined && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(image !== undefined && { image }),
        ...(status && { status }),
        ...(categoryId !== undefined && { categoryId }),
        ...(authorId && (req.user?.role === 'ADMIN' || req.user?.role === 'EDITOR') && { authorId }),
        ...(tagIds && {
          tags: {
            set: tagIds.map((id: string) => ({ id })),
          },
        }),
      },
      include: { author: true, category: true, tags: true },
    });
    res.json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update post' });
  }
});

// Delete post
router.delete('/:id', optionalAuth, async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    
    // Get current article
    const currentArticle = await prisma.article.findUnique({
      where: { id: articleId },
      select: { authorId: true },
    });
    
    if (!currentArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Check permissions
    if (req.user) {
      // Writers can only delete their own articles
      if (req.user.role === 'WRITER' && currentArticle.authorId !== req.user.id) {
        return res.status(403).json({ error: 'You can only delete your own articles' });
      }
    }
    
    await prisma.article.delete({ where: { id: articleId } });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to delete post' });
  }
});

export default router;
