import { Request, Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../interfaces/user.interface';

type Middleware = (
    req: Request | IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
) => void;

const awaitHandlerFactory = (middleware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await middleware(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export default awaitHandlerFactory;
