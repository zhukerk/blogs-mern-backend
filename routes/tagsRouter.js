import { Router } from 'express';

import { postController } from '../controllers/index.js';

export const tagsRouter = new Router();

tagsRouter.get('/get-last', postController.getLastTags);

