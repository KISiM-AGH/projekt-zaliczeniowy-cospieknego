import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../models';

dotenv.config();

interface JwtPayload {
    userId: string;
}

const auth = (...roles: string[]) => {
    return async function (req: any, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            (!authHeader || !authHeader.startsWith(bearer)) &&
                res.status(401).send({
                    error: {
                        code: 'access_denied',
                        message: 'Access denied! No credentials.',
                    },
                });

            const token = authHeader.replace(bearer, '');
            const secret = process.env.SECRET_JWT || '';
            const decoded = jwt.verify(token, secret) as JwtPayload;
            const user = await User.findById(decoded.userId).select(
                'email username images type product gender'
            );

            !user &&
                res.status(401).send({
                    error: {
                        code: 'auth_failed',
                        message: `Authentication failed! ${decoded}`,
                    },
                });

            const adminAuthorized = req.params.id == user.id.toString();

            !adminAuthorized &&
                roles.length &&
                !roles.includes(user.role) &&
                res.status(401).send({
                    error: {
                        code: 'unauthorized',
                        message: 'Unauthorized access!',
                    },
                });

            req.currentUser = user.toJSON();
            next();
        } catch (e) {
            e.status = 401;
            next(e);
        }
    };
};

export default auth;
