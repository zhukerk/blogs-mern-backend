import jwt from 'jsonwebtoken';

import { ApiError } from '../utils/index.js';
import { middlewareErrorLogger } from '../utils/index.js';

export const checkAuthMiddleware = (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            req.userId = decoded._id;
            next();
        } catch (err) {
            middlewareErrorLogger('checkAuth', err);
            next(ApiError.unauthorized('Not authorized'));
        }
    } else {
        next(ApiError.unauthorized('Not authorized'));
    }
};
