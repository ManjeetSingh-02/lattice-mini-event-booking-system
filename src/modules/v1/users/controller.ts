// internal-imports
import { ErrorResponse, prisma, SuccessResponse } from '../../../core/index.js';

// type-imports
import type { ISuccessResponse, IErrorResponse } from '../../../core/index.js';
import type { Request, Response } from 'express';

// controller for module
export const controller = {
  // @controller GET /:id/bookings
  getUserBookings: async (
    request: Request,
    response: Response<ISuccessResponse<Array<object>> | IErrorResponse<null>>
  ) => {
    // find user with given id and select only bookings
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(request.params.id) },
      select: { bookings: true },
    });

    // if user not found, send ErrorResponse
    if (!existingUser)
      return response.status(404).json(
        new ErrorResponse<null>({
          message: 'User not found',
          code: 'USER_NOT_FOUND',
          issues: null,
        })
      );

    // send SuccessResponse with user bookings
    return response.status(200).json(
      new SuccessResponse<Array<object>>({
        message: 'User bookings retrieved successfully',
        data: existingUser.bookings,
      })
    );
  },
};
