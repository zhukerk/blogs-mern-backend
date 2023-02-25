import { Router } from 'express';

import { userRouter } from './userRouter.js';
import { tagsRouter } from './tagsRouter.js';
import { postsRouter } from './postsRouter.js';

export const apiRouter = new Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/tags', tagsRouter);
apiRouter.use('/posts', postsRouter);
