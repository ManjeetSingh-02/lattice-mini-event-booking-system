// internal-imports
import { prisma, SuccessResponse } from '../../../core/index.js';

// type-imports
import type { ISuccessResponse } from '../../../core/index.js';
import type { Request, Response } from 'express';

// controller for module
export const controller = {
  // @controller GET /:id/bookings
  getUserBookings: async (
    request: Request,
    response: Response<ISuccessResponse<Array<object>>>
  ) => {
    // find bookings of user with given id
    const existingUserBookings = await prisma.booking.findMany({
      where: { userId: Number(request.params.id) },
      include: { event: true },
    });

    // send SuccessResponse with user bookings
    return response.status(200).json(
      new SuccessResponse<Array<object>>({
        message: 'User bookings retrieved successfully',
        data: existingUserBookings,
      })
    );
  },
};
