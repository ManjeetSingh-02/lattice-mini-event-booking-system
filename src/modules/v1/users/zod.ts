// external-imports
import z from 'zod';

// schema for getUserBookings
export const getUserBookingsSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
});
