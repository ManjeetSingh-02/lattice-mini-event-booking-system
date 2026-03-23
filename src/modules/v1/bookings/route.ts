// internal-imports
import { asyncHandler, validateZodSchema } from '../../../core/index.js';
import { controller } from './controller.js';
import { createBookingSchema } from './zod.js';

// external-imports
import { Router } from 'express';

// router for module
export const router = Router();

// @route POST /
router.post('/', validateZodSchema(createBookingSchema), asyncHandler(controller.createBooking));
