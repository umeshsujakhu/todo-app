import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-error';

class UnAuthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnAuthenticatedError;
