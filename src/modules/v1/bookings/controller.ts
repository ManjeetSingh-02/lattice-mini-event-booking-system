// internal-imports
import { ErrorResponse, prisma, SuccessResponse } from '../../../core/index.js';

// external-imports
import crypto from 'crypto';

// type-imports
import type { ISuccessResponse, IErrorResponse } from '../../../core/index.js';
import type { Request, Response } from 'express';

// sub-function for generating random booking code
function generateBookingCode(): string {
  return `${crypto.randomBytes(6).toString('hex').toUpperCase()}-${Date.now()}`;
}

// controller for module
export const controller = {
  // @controller POST /
  createBooking: async (
    request: Request,
    response: Response<ISuccessResponse<object> | IErrorResponse<null>>
  ) => {
    try {
      const result = await prisma.$transaction(async tsx => {
        // check if event exists
        const existingEvent = await tsx.event.findUnique({
          where: { id: Number(request.body.eventId) },
          select: { remainingTickets: true },
        });
        if (!existingEvent) throw new Error('EVENT_NOT_FOUND');

        // check if user exists
        const existingUser = await tsx.user.findUnique({
          where: { id: Number(request.body.userId) },
        });
        if (!existingUser) throw new Error('USER_NOT_FOUND');

        // check if tickets are available and update remaining tickets
        const updated = await tsx.event.updateMany({
          where: {
            id: Number(request.body.eventId),
            remainingTickets: { gte: Number(request.body.ticketsCount) },
          },
          data: { remainingTickets: { decrement: Number(request.body.ticketsCount) } },
        });
        if (updated.count === 0) throw new Error('TICKETS_NOT_AVAILABLE');

        // create new booking and return it
        return await tsx.booking.create({
          data: {
            eventId: Number(request.body.eventId),
            userId: Number(request.body.userId),
            ticketsCount: Number(request.body.ticketsCount),
            bookingCode: generateBookingCode(),
          },
        });
      });

      // send success response
      return response.status(201).json(
        new SuccessResponse<object>({
          message: 'Booking created successfully',
          data: result,
        })
      );
    } catch (error) {
      // handle known errors
      if (error instanceof Error) {
        // handle case when event is not found
        if (error.message === 'EVENT_NOT_FOUND')
          return response.status(404).json(
            new ErrorResponse({
              message: 'Event not found with given eventId',
              code: error.message,
              issues: null,
            })
          );

        // handle case when user is not found
        if (error.message === 'USER_NOT_FOUND')
          return response.status(404).json(
            new ErrorResponse({
              message: 'User not found with given userId',
              code: error.message,
              issues: null,
            })
          );

        // handle case when tickets are not available
        if (error.message === 'TICKETS_NOT_AVAILABLE')
          return response.status(400).json(
            new ErrorResponse({
              message: 'Not enough tickets available',
              code: 'TICKETS_NOT_AVAILABLE',
              issues: null,
            })
          );
      }

      // send generic ErrorResponse
      return response.status(500).json(
        new ErrorResponse({
          message: 'Something went wrong while creating booking',
          code: 'INTERNAL_SERVER_ERROR',
          issues: null,
        })
      );
    }
  },
};
