import { Router, Request, Response } from 'express';
import prisma from '../services/prisma';
import { hashPassword, verifyPassword, needsRehash } from '../utils/password';

const router = Router();

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
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
    
    // Verify password using secure comparison
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // If password needs rehashing (e.g., was plain text or using old algorithm)
    // Rehash it transparently on successful login
    if (needsRehash(user.password)) {
      const newHash = await hashPassword(password);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: newHash },
      });
      console.log(`Password rehashed for user: ${user.email}`);
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    // Create name for compatibility
    const name = user.displayName || `${user.firstName} ${user.lastName}`;
    
    res.json({
      user: { ...userWithoutPassword, name },
      token: user.id, // Using user ID as token for now (replace with JWT in production)
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, displayName, name } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    
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
    
    // Hash password with unique salt
    const hashedPassword = await hashPassword(password);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
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
      token: user.id, // Using user ID as token for now
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
});

// Get current user
router.get('/me', async (req: Request, res: Response) => {
  try {
    // Get user ID from header (should come from JWT verification in production)
    const userId = req.headers['x-user-id'] as string || req.headers.authorization?.replace('Bearer ', '');
    
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

// Change password
router.post('/change-password', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['x-user-id'] as string || req.headers.authorization?.replace('Bearer ', '');
    const { currentPassword, newPassword } = req.body;
    
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }
    
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, password: true },
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Verify current password
    const isValid = await verifyPassword(currentPassword, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    
    // Hash and save new password
    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    
    res.json({ message: 'Password changed successfully' });
  } catch (error: any) {
    console.error('Change password error:', error);
    res.status(500).json({ error: error.message || 'Failed to change password' });
  }
});

// Logout (client-side token removal)
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

export default router;
