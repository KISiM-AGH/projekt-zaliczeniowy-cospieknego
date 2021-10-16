import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/httpException.utils';

const errorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { status = 500, message, data } = error;
    // console.error(`[Error] ${error}`);
    message = status === 500 || !message ? 'Internal server error' : message;

    error = {
        type: 'error',
        status,
        message,
        ...(data && data),
    };

    res.status(status).send(error);
};

export default errorMiddleware;
