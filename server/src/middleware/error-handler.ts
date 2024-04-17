import { Errback, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/custom-error';

const errorHandlerMiddleware = (err: Errback, req: Request, res: Response, next: NextFunction) => {
  const customError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong',
  };

  if (err instanceof CustomAPIError) {
    customError.statusCode = err.statusCode;
    customError.message = err.message;
  }

  return res.status(customError.statusCode).json({ success: false, message: customError.message });
};

export default errorHandlerMiddleware;
