// pages/api/getData.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Check if the request is a GET request

      const { id } = req.query;

      if (id) {
        // If an ID is provided in the query parameters, fetch a specific wine
        const wine = await prisma.wine.findUnique({
          where: {
            id: parseInt(id, 10), // Assuming ID is an integer
          },
        });

        if (wine) {
          res.status(200).json(wine);
        } else {
          res.status(404).json({ error: 'Wine not found' });
        }
      } else {
        // If no ID is provided, fetch all wines
        const allWines = await prisma.wine.findMany();
        res.status(200).json(allWines);
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
