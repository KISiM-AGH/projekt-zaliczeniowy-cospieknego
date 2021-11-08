import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserModel from '../models/users.model';
import {
    default as IUser,
    IGetUserAuthInfoRequest,
} from '../interfaces/user.interface';

dotenv.config();

interface JwtPayload {
    _id: string;
}

const auth = (...roles: string[]) => {
    return async function (req: Request, res: Response, next: NextFunction) {
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
            const { _id } = jwt.verify(token, secret) as JwtPayload;
            const user = await UserModel.find({ id: _id });

            !user &&
                res.status(401).send({
                    error: {
                        code: 'auth_failed',
                        message: 'Authentication failed!',
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

            //req.currentUser = user;
            next();
        } catch (e) {
            e.status = 401;
            next(e);
        }
    };
};

export default auth;
