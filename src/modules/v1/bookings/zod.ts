// external-imports
import z from 'zod';

// schema for createBooking
export const createBookingSchema = z.object({
  body: z.object({
    userId: z.coerce.number().int().positive(),
    eventId: z.coerce.number().int().positive(),
    ticketsCount: z.coerce.number().int().positive(),
  }),
});
