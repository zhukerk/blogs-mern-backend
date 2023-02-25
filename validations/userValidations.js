import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
];

export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Not strong password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }),
    body('login', 'Enter login (min 3 symbols)').isLength({ min: 3 }),
    body('avatarUrl', 'Invalid avatar URL').optional().isURL(),
];

