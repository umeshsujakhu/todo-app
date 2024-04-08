import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const successResponse = ({
  res,
  statusCode = StatusCodes.OK,
  message = "Success",
  data = null,
}: {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: unknown;
}) => {
  const responseObject: Record<string, any> = {
    success: true,
    message,
    data,
  };

  res.status(statusCode ?? StatusCodes.OK).json(responseObject);
};

export const errorResponse = ({
  res,
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
  message = "Error",
  errors = null,
}: {
  res: Response;
  statusCode?: number;
  message?: string;
  errors?: unknown;
}) => {
  res.status(statusCode ?? StatusCodes.BAD_REQUEST).json({
    success: false,
    message,
    errors,
  });
};
