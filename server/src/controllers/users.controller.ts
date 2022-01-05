import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { IGetUserAuthInfoRequest } from '../interfaces/user.interface';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().exec();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).exec();
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getCurrentUser = async (
    req: IGetUserAuthInfoRequest,
    res: Response
) => {
    const { password, ...userWithoutPassword } = req.currentUser;
    res.send(userWithoutPassword);
};

export const saveUser = async (req: Request, res: Response) => {
    try {
        let found = await User.findOne({ email: req.params.email }).exec();
        found = !found
            ? await User.findOne({ username: req.params.username }).exec()
            : found;

        if (found) {
            res.status(401).json({
                error: {
                    code: 'errorInvalidData',
                    message: 'User with that email or username already exists',
                },
            });
            return;
        }

        const user = new User(req.body);
        const saved = await user.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).exec();
    if (!user) return res.status(404).json({ message: 'User was not found' });

    try {
        const updated = await User.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).exec();
    if (!user) return res.status(404).json({ message: 'User not found' });

    try {
        const deleted = await User.deleteOne({ _id: req.params.id });
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    checkValidation(req, res);
    const { login, password, remember } = req.body;

    try {
        let user = await User.findOne({ email: login }).exec();
        user = !user ? await User.findOne({ username: login }) : user;

        if (!user) {
            res.status(401).send({
                error: {
                    code: 'errorInvalidCredentials',
                    message: 'Invalid email or username',
                },
            });
            return;
        }

        user = user.toJSON();
        const isMatch = await bcrypt.compare(password, user.password);

        !isMatch &&
            res.status(401).send({
                error: {
                    code: 'errorInvalidCredentials',
                    message: 'Incorrect password',
                },
            });

        const secret = process.env.SECRET_JWT || '';
        const token = jwt.sign({ userId: user.id.toString() }, secret, {
            expiresIn: remember ? '7d' : '24h',
        });

        const { extractedPassword, ...userWithoutPassword } = user;
        res.send({ user: { ...userWithoutPassword }, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const checkValidation = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({
            code: 'errorValidationFailed',
            errors: errors.array(),
        });
    }
};
