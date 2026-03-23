// internal-imports
import { ErrorResponse, prisma, SuccessResponse } from '../../../core/index.js';

// type-imports
import type { ISuccessResponse, IErrorResponse } from '../../../core/index.js';
import type { Request, Response } from 'express';

// controller for module
export const controller = {
  // @controller POST /
  createEvent: async (
    request: Request,
    response: Response<ISuccessResponse<object> | IErrorResponse<null>>
  ) => {
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

    // if event creation fails, send ErrorResponse
    if (!newEvent)
      return response.status(500).json(
        new ErrorResponse({
          message: 'Something went wrong while creating the event',
          code: 'EVENT_CREATION_FAILED',
          issues: null,
        })
      );

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
    // fetch event attendance details from db
    const existingEvent = await prisma.event.findUnique({
      where: { id: Number(request.params.id) },
      select: { totalCapacity: true, remainingTickets: true },
    });

    // if event not found, send ErrorResponse
    if (!existingEvent)
      return response.status(404).json(
        new ErrorResponse<null>({
          message: 'Event not found',
          code: 'EVENT_NOT_FOUND',
          issues: null,
        })
      );

    // send SuccessResponse with event attendance details
    return response.status(200).json(
      new SuccessResponse({
        message: 'Event attendance retrieved successfully',
        data: {
          totalTickets: existingEvent.totalCapacity,
          bookedTickets: existingEvent.totalCapacity - existingEvent.remainingTickets,
          remainingTickets: existingEvent.remainingTickets,
        },
      })
    );
  },
};
