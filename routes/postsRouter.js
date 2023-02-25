import { Router } from 'express';

import { postController } from '../controllers/index.js';
import { validationMiddleware, checkAuthMiddleware } from '../middleware/index.js';
import { postCreateValidation } from '../validations/index.js';

export const postsRouter = new Router();

postsRouter.get('/',checkAuthMiddleware, postController.getAll);
postsRouter.get('/tags', postController.getLastTags);
postsRouter.get('/:id', postController.getOne);

postsRouter.post('/', checkAuthMiddleware, postCreateValidation, validationMiddleware, postController.create);

postsRouter.delete('/:id', checkAuthMiddleware, postController.remove);

postsRouter.patch('/:id', checkAuthMiddleware, postCreateValidation, validationMiddleware, postController.update);
