import { Request, Response, NextFunction } from 'express';
import env from '../config/env';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const isDev = env.NODE_ENV === 'development';

  console.error(`[ERROR] ${err.message}`);

  res.status(500).json({
    error: 'Internal server error',
    ...(isDev && { message: err.message, stack: err.stack }),
  });
};
