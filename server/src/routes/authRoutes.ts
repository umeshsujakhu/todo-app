import { Router } from 'express';
import { registerSchema } from '../schema/LoginSchema';
import validate from '../middleware/validate';
import { login, register } from '../controllers/authController';
import { asyncWrapper } from '../utils/async'

const router = Router();

router.post('/register', validate(registerSchema), asyncWrapper(register));
router.post('/login', validate(registerSchema), asyncWrapper(login));

export default router;
