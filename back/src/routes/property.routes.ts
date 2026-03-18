import { Router } from 'express';
import * as propertyController from '../controllers/property.controller';

const router = Router();

router.get('/', propertyController.getAll);
router.get('/:id', propertyController.getById);

export default router;
