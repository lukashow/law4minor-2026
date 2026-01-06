import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import prisma from '../services/prisma';
import { upload, getUploadsDir } from '../services/upload';
import { optionalAuth } from '../services/auth';
import sharp from 'sharp';

const router = Router();

// Get all media with optional filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = '1', perPage = '20', type, articleId } = req.query;
    const skip = (Number(page) - 1) * Number(perPage);
    
    const where: any = {};
    if (type) where.mimeType = { startsWith: type as string };
    if (articleId) where.articleId = articleId as string;
    
    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: Number(perPage),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.media.count({ where }),
    ]);
    
    res.json({
      items: media,
      page: Number(page),
      perPage: Number(perPage),
      totalItems: total,
      totalPages: Math.ceil(total / Number(perPage)),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch media' });
  }
});

// Get single media with optional resolution
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const media = await prisma.media.findUnique({
      where: { id: req.params.id },
    });
    
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    res.json(media);
  } catch (error) {
    res.status(404).json({ error: 'Media not found' });
  }
});

// Serve file with optional resize
router.get('/:id/file', async (req: Request, res: Response) => {
  try {
    const { width, height, quality } = req.query;
    
    const media = await prisma.media.findUnique({
      where: { id: req.params.id },
    });
    
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    const filePath = path.join(getUploadsDir(), media.filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // If resize requested and it's an image
    if ((width || height) && media.mimeType.startsWith('image/') && media.mimeType !== 'image/svg+xml') {
      try {
        const resizedImage = await sharp(filePath)
          .resize({
            width: width ? parseInt(width as string) : undefined,
            height: height ? parseInt(height as string) : undefined,
            fit: 'inside',
          })
          .jpeg({ quality: quality ? parseInt(quality as string) : 80 })
          .toBuffer();
        
        res.set('Content-Type', 'image/jpeg');
        res.send(resizedImage);
        return;
      } catch (resizeError) {
        // Fall through to serve original
      }
    }
    
    res.sendFile(filePath);
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

// Upload file
router.post('/upload', optionalAuth, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const file = req.file;
    
    // Get image dimensions if it's an image
    let width: number | undefined;
    let height: number | undefined;
    
    if (file.mimetype.startsWith('image/') && file.mimetype !== 'image/svg+xml') {
      try {
        const metadata = await sharp(file.path).metadata();
        width = metadata.width;
        height = metadata.height;
      } catch (e) {
        // Continue without dimensions
      }
    }
    
    // Create media record
    const media = await prisma.media.create({
      data: {
        filename: file.filename,
        url: `/uploads/${file.filename}`,
        mimeType: file.mimetype,
        size: file.size,
        width,
        height,
        alt: req.body.alt || '',
        caption: req.body.caption || '',
        uploadedBy: req.user?.id,
        articleId: req.body.articleId,
      },
    });
    
    res.status(201).json(media);
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(400).json({ error: error.message || 'Failed to upload file' });
  }
});

// Create media record (for backward compatibility)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { 
      filename, 
      url, 
      mimeType, 
      size, 
      width, 
      height, 
      alt, 
      caption, 
      uploadedBy, 
      articleId 
    } = req.body;
    
    const media = await prisma.media.create({
      data: { 
        filename, 
        url, 
        mimeType, 
        size, 
        width, 
        height, 
        alt, 
        caption, 
        uploadedBy, 
        articleId 
      },
    });
    res.status(201).json(media);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to create media record' });
  }
});

// Update media metadata
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { filename, alt, caption, articleId } = req.body;
    const media = await prisma.media.update({
      where: { id: req.params.id },
      data: {
        ...(filename && { filename }),
        ...(alt !== undefined && { alt }),
        ...(caption !== undefined && { caption }),
        ...(articleId !== undefined && { articleId }),
      },
    });
    res.json(media);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update media' });
  }
});

// Delete media
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const media = await prisma.media.findUnique({ where: { id: req.params.id } });
    
    if (media) {
      // Delete file from disk
      const filePath = path.join(getUploadsDir(), media.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      // Delete database record
      await prisma.media.delete({ where: { id: req.params.id } });
    }
    
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to delete media' });
  }
});

export default router;
