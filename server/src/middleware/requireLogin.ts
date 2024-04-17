import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors';
import { config } from '../config/keys';

interface AuthRequest extends Request {
  user?: { userId: string; email: string };
}

const requireLogin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new BadRequestError('No Authorization header provided.');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new BadRequestError('Malformed auth header');
  }

  const payload = jwt.verify(token, config.JWT_SECRET) as { userId: string; email: string };
  if (!payload) {
    throw new BadRequestError('Token verification failed');
  }

  req.user = payload;

  next();
};

export default requireLogin;
