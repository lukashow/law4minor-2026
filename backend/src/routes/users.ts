import { Router, Request, Response } from 'express';
import prisma from '../services/prisma';

const router = Router();

// Get all users (optionally filter by team members)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { role, isTeamMember } = req.query;
    const where: any = {};
    if (role) where.role = role as string;
    if (isTeamMember === 'true') where.isTeamMember = true;
    
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        publicEmail: true,
        avatar: true,
        bio: true,
        role: true,
        twitter: true,
        facebook: true,
        instagram: true,
        dribbble: true,
        linkedin: true,
        customLinks: true,
        isTeamMember: true,
        teamOrder: true,
        teamRole: true,
        createdAt: true,
        _count: { select: { articles: true } },
      },
      orderBy: isTeamMember === 'true' ? { teamOrder: 'asc' } : { createdAt: 'desc' },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch users' });
  }
});

// Get single user
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        publicEmail: true,
        avatar: true,
        bio: true,
        role: true,
        twitter: true,
        facebook: true,
        instagram: true,
        dribbble: true,
        linkedin: true,
        customLinks: true,
        isTeamMember: true,
        teamOrder: true,
        teamRole: true,
        createdAt: true,
        articles: { take: 5, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { 
      firstName,
      lastName,
      displayName,
      publicEmail,
      avatar,
      bio,
      role,
      twitter,
      facebook,
      instagram,
      dribbble,
      linkedin,
      customLinks,
      isTeamMember,
      teamOrder,
      teamRole,
    } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(displayName !== undefined && { displayName }),
        ...(publicEmail !== undefined && { publicEmail }),
        ...(avatar !== undefined && { avatar }),
        ...(bio !== undefined && { bio }),
        ...(role && { role }),
        ...(twitter !== undefined && { twitter }),
        ...(facebook !== undefined && { facebook }),
        ...(instagram !== undefined && { instagram }),
        ...(dribbble !== undefined && { dribbble }),
        ...(linkedin !== undefined && { linkedin }),
        ...(customLinks !== undefined && { customLinks }),
        ...(isTeamMember !== undefined && { isTeamMember }),
        ...(teamOrder !== undefined && { teamOrder }),
        ...(teamRole !== undefined && { teamRole }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        publicEmail: true,
        avatar: true,
        bio: true,
        role: true,
        twitter: true,
        facebook: true,
        instagram: true,
        dribbble: true,
        linkedin: true,
        customLinks: true,
        isTeamMember: true,
        teamOrder: true,
        teamRole: true,
        createdAt: true,
      },
    });
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update user' });
  }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to delete user' });
  }
});

export default router;
