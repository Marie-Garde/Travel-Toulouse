import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/properties', async (_req, res) => {
  const properties = await prisma.property.findMany({
    include: {
      images: true,
      amenities: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json(properties);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
