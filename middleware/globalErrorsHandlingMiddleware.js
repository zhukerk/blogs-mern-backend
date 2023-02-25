import { ApiError } from '../utils/ApiError.js';
import { middlewareErrorLogger } from '../utils/index.js';

export const globalErrorsHandlingMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }

    middlewareErrorLogger('globalErrorsHandlingMiddleware', err);

    return res.status(500).json({ message: 'Unexpected error!' });
};
