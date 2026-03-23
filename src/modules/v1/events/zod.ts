// external-imports
import z from 'zod';

// schema for createEvent
export const createEventSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .nonempty({ error: 'title is required' })
      .min(5, { error: 'title must be at least 5 characters long' })
      .max(20, { error: 'title must be at most 20 characters long' }),
    description: z
      .string()
      .trim()
      .nonempty({ error: 'description is required' })
      .min(5, { error: 'description must be at least 5 characters long' })
      .max(20, { error: 'description must be at most 20 characters long' }),
    date: z.iso.date({ error: 'date must be in YYYY-MM-DD format' }),
    time: z.iso.time({ error: 'time must be in HH:MM format' }),
    totalCapacity: z.coerce.number().int().positive({ error: 'totalCapacity must be atleast 1' }),
  }),
});

// schema for getEventAttendance
export const getEventAttendanceSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),

  body: z.object({
    bookingCode: z.string().trim().nonempty({ error: 'bookingCode is required' }),
  }),
});
