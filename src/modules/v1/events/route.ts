// internal-imports
import { asyncHandler, validateZodSchema } from '../../../core/index.js';
import { controller } from './controller.js';
import { createEventSchema, getEventAttendanceSchema } from './zod.js';

// external-imports
import { Router } from 'express';

// router for module
export const router = Router();

// @route POST /
router.post('/', validateZodSchema(createEventSchema), asyncHandler(controller.createEvent));

// @route GET /
router.get('/', asyncHandler(controller.getAllEvents));

// @route GET /:id/attendance
router.get(
  '/:id/attendance',
  validateZodSchema(getEventAttendanceSchema),
  asyncHandler(controller.getEventAttendance)
);
