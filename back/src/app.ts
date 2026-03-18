import express from 'express';
import cors from 'cors';
import propertyRoutes from './routes/property.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/properties', propertyRoutes);

app.use(errorMiddleware);

export default app;
