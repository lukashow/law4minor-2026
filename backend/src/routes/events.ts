import { Router, Request, Response } from 'express';
import prisma from '../services/prisma';

const router = Router();

// Get all events
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = '1', perPage = '20' } = req.query;
    const skip = (Number(page) - 1) * Number(perPage);
    
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        skip,
        take: Number(perPage),
        orderBy: { startDate: 'desc' },
      }),
      prisma.event.count(),
    ]);
    
    res.json({
      items: events,
      page: Number(page),
      perPage: Number(perPage),
      totalItems: total,
      totalPages: Math.ceil(total / Number(perPage)),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch events' });
  }
});

// Get single event
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(404).json({ error: 'Event not found' });
  }
});

// Create event
router.post('/', async (req: Request, res: Response) => {
  try {
    const { 
      banner, 
      name, 
      startDate, 
      endDate, 
      minAge, 
      maxAge, 
      participationType, 
      description, 
      attendLink 
    } = req.body;
    
    const event = await prisma.event.create({
      data: {
        banner,
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        minAge,
        maxAge,
        participationType: participationType || 'individual',
        description,
        attendLink,
      },
    });
    res.status(201).json(event);
  } catch (error: any) {
    console.error('Error creating event:', error);
    res.status(400).json({ error: error.message || 'Failed to create event' });
  }
});

// Update event
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { 
      banner, 
      name, 
      startDate, 
      endDate, 
      minAge, 
      maxAge, 
      participationType, 
      description, 
      attendLink 
    } = req.body;
    
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        ...(banner !== undefined && { banner }),
        ...(name && { name }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(minAge !== undefined && { minAge }),
        ...(maxAge !== undefined && { maxAge }),
        ...(participationType && { participationType }),
        ...(description !== undefined && { description }),
        ...(attendLink !== undefined && { attendLink }),
      },
    });
    res.json(event);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update event' });
  }
});

// Delete event
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to delete event' });
  }
});

export default router;
