// pages/api/editWine.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method !== 'PUT') {
      // Return a 405 Method Not Allowed status if the method is not PUT
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    const { id, name, year, type, varietal, rating, consumed, dateConsumed } = req.body;

    if (!id || !name || !year || !type || !varietal) {
      res.status(400).json({ error: 'Bad Request' });
      return;
    }

    const updatedWine = await prisma.wine.update({
      where: { id },
      data: {
        name,
        year,
        type,
        varietal,
        rating,
        consumed,
        dateConsumed,
      },
    });

    res.status(200).json(updatedWine);
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
