// internal-imports
import { ErrorResponse, prisma, SuccessResponse } from '../../../core/index.js';

// type-imports
import type { ISuccessResponse, IErrorResponse } from '../../../core/index.js';
import type { Request, Response } from 'express';

// controller for module
export const controller = {
  // @controller POST /
  createEvent: async (request: Request, response: Response<ISuccessResponse<object>>) => {
    // create a new event in db
    const newEvent = await prisma.event.create({
      data: {
        title: request.body.title,
        description: request.body.description,
        date: new Date(`${request.body.date}T${request.body.time}`).toISOString(),
        totalCapacity: request.body.totalCapacity,
        remainingTickets: request.body.totalCapacity,
      },
    });

    // send SuccessResponse with created event details
    return response.status(201).json(
      new SuccessResponse({
        message: 'Event created successfully',
        data: newEvent,
      })
    );
  },

  // @controller GET /
  getAllEvents: async (_request: Request, response: Response<ISuccessResponse<Array<object>>>) => {
    // fetch all events from db
    const allEvents = await prisma.event.findMany();

    // send SuccessResponse with allEvents
    return response.status(200).json(
      new SuccessResponse({
        message: 'Events retrieved successfully',
        data: allEvents,
      })
    );
  },

  // @controller GET /:id/attendance
  getEventAttendance: async (
    request: Request,
    response: Response<ISuccessResponse<object> | IErrorResponse<null>>
  ) => {
    // fetch booking details of the event and bookingCode from db
    const existingBooking = await prisma.booking.findUnique({
      where: { eventId: Number(request.params.id), bookingCode: request.body.bookingCode },
      select: { ticketsCount: true },
    });

    // if booking not found, send ErrorResponse
    if (!existingBooking)
      return response.status(404).json(
        new ErrorResponse<null>({
          message: 'Booking not found for the provided eventId and bookingCode',
          code: 'BOOKING_NOT_FOUND',
          issues: null,
        })
      );

    // send SuccessResponse with booking ticketsCount
    return response.status(200).json(
      new SuccessResponse<object>({
        message: 'Number of tickets booked retrieved successfully',
        data: { ticketsBooked: existingBooking.ticketsCount },
      })
    );
  },
};
