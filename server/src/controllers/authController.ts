import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import User, { IUser } from '../model/User';
import { LoginSchema, RegisterSchema } from '../schema/LoginSchema';
import { errorResponse, successResponse } from '../utils/response';
import { StatusCodes } from 'http-status-codes';
import { comparePassword, generateToken } from '../utils/helper';
import { UnAuthenticatedError } from '../errors';

async function checkIfEmailExist(email: string): Promise<IUser> {
  return await User.findOne({ email });
}

export const register = async (
  req: Request<RegisterSchema['body'], unknown, RegisterSchema['body']>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const emailExist = await checkIfEmailExist(email as string);
    if (emailExist) {
      const error = {
        path: 'email',
        message: 'Email already exists',
      };
      return errorResponse({ res, statusCode: StatusCodes.BAD_REQUEST, errors: [error] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password as string, salt);
    const user = await User.create({
      email,
      password: hashedPassword,
    });
    const token = generateToken(user.id, user.email);
    successResponse({ res, statusCode: StatusCodes.CREATED, message: 'User Registered successfully.', data: { token } });
  } catch (error) {
    console.error('Error registering:', error);
    errorResponse({ res, statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Failed to register' });
  }
};

export const login = async (req: Request<unknown, unknown, LoginSchema['body']>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await checkIfEmailExist(email as string);

    if (!user) {
      throw new UnAuthenticatedError("User doesn't exist");
    }

    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword) {
      throw new UnAuthenticatedError("Password doesn't match.");
    }

    const token = generateToken(user.id, user.email);

    successResponse({
      res,
      statusCode: StatusCodes.OK,
      message: 'Logged in successfully.',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      },
    });
};
