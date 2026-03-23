// internal-imports
import { asyncHandler, validateZodSchema } from '../../../core/index.js';
import { controller } from './controller.js';
import { getUserBookingsSchema } from './zod.js';

// external-imports
import { Router } from 'express';

// router for module
export const router = Router();

// @route GET /:id/bookings
router.get(
  '/:id/bookings',
  validateZodSchema(getUserBookingsSchema),
  asyncHandler(controller.getUserBookings)
);
