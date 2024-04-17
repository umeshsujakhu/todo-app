import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/keys';

export const comparePassword = async (enteredPassword: string, encryptedPassword: string) => {
  const isMatch = await bcrypt.compare(enteredPassword, encryptedPassword);
  return isMatch;
};

export const generateToken = (userId: string | number, email: string) => {
  return jwt.sign({ userId, email }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};
