import { Request, Response, NextFunction } from 'express';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

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
