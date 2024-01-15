// pages/api/deleteWine.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method !== 'DELETE') {
      // Return a 405 Method Not Allowed status if the method is not DELETE
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    const { id } = req.body;

    if (!id) {
      res.status(400).json({ error: 'Bad Request' });
      return;
    }

    await prisma.wine.delete({
      where: { id },
    });

    res.status(204).end(); // 204 No Content for successful deletion
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
