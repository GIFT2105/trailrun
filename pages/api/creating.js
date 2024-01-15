// pages/api/creating.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    const {
      id,
      name,
      year,
      type,
      varietal,
      rating,
      consumed,
  
    } = req.body;

    // Validate required fields
    if (!id || !name || !year || !type || !varietal) {
      res.status(400).json({ error: 'Bad Request' });
      return;
    }

    // Create new wine
    const newWine = await prisma.wine.create({
      data: {
        id: parseInt(id, 10),
        name,
        year: parseInt(year, 10),
        type,
        varietal,
        rating: rating ? parseFloat(rating) : null,
        consumed: consumed || false,
      },
    });

    res.status(201).json(newWine);
  } catch (error) {
    console.error('Error adding wine:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
