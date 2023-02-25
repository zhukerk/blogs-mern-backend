import { Router } from 'express';

import { registerValidation, loginValidation } from '../validations/index.js';
import { validationMiddleware, checkAuthMiddleware } from '../middleware/index.js';
import { userController } from '../controllers/index.js';

export const userRouter = new Router();

userRouter.get('/me', checkAuthMiddleware, userController.getMe);

userRouter.post('/login', loginValidation, validationMiddleware, userController.login);
userRouter.post('/register', registerValidation, validationMiddleware, userController.register);
