import { Router, Request, Response } from 'express';
import prisma from '../services/prisma';
// Note: In production, use bcrypt for password hashing and JWT for tokens

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        avatar: true,
        role: true,
        password: true,
      },
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // TODO: Use bcrypt.compare in production
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // TODO: Generate JWT token in production
    const { password: _, ...userWithoutPassword } = user;
    
    // Create name for compatibility
    const name = user.displayName || `${user.firstName} ${user.lastName}`;
    
    res.json({
      user: { ...userWithoutPassword, name },
      token: 'mock-jwt-token', // Replace with real JWT
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, displayName, name } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Allow both new format (firstName/lastName) and legacy (name)
    let fName = firstName;
    let lName = lastName;
    if (!firstName && name) {
      const parts = name.split(' ');
      fName = parts[0];
      lName = parts.slice(1).join(' ') || '';
    }
    
    // TODO: Hash password with bcrypt in production
    const user = await prisma.user.create({
      data: {
        email,
        password, // Hash this!
        firstName: fName,
        lastName: lName || '',
        displayName: displayName || name || `${fName} ${lName || ''}`.trim(),
        role: 'WRITER',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        role: true,
      },
    });
    
    res.status(201).json({
      user: { ...user, name: user.displayName },
      token: 'mock-jwt-token', // Replace with real JWT
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
});

// Get current user
router.get('/me', async (req: Request, res: Response) => {
  try {
    // TODO: Get user ID from JWT token
    const userId = req.headers['x-user-id'] as string;
    
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        avatar: true,
        role: true,
      },
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ ...user, name: user.displayName || `${user.firstName} ${user.lastName}` });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to get user' });
  }
});

// Logout (client-side token removal)
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
