import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import propertyRoutes from './routes/property.routes';
import authRoutes from './routes/auth.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/properties', propertyRoutes);

app.use(errorMiddleware);

export default app;
