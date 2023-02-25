import { body } from 'express-validator';

export const postCreateValidation = [
    body('title', 'Enter post title (min length 3)').isLength({ min: 3 }).isString(),
    body('text', 'Enter post text (min length 10)').isLength({ min: 10 }).isString(),
    body('tags', 'Invalid tags format').optional().isString(),
    body('imageUrl', 'Invalid image URL').optional().isURL(),
];
