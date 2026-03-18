import { Request, Response, NextFunction } from 'express';
import * as propertyService from '../services/property.service';

export const getAll = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const properties = await propertyService.findAllProperties();
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

export const getById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid id' });
      return;
    }

    const property = await propertyService.findPropertyById(id);

    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    res.json(property);
  } catch (err) {
    next(err);
  }
};
