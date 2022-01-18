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
    res.status(200).send(userWithoutPassword);
};

export const getUserAlbums = async (
    req: IGetUserAuthInfoRequest,
    res: Response
) => {
    try {
        const user = await User.findById(req.currentUser.id)
            .populate({
                path: 'saved.albums',
                populate: [
                    {
                        path: 'artists',
                    },
                    {
                        path: 'tracks',
                    },
                ],
            })
            .exec();
        res.json(user.saved.albums);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserFollowing = async (
    req: IGetUserAuthInfoRequest,
    res: Response
) => {
    try {
        const user = await User.findById(req.currentUser.id, 'saved.artists')
            .populate('saved.artists')
            .exec();
        res.json(user.saved.artists);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserPlaylists = async (
    req: IGetUserAuthInfoRequest,
    res: Response
) => {
    try {
        const user = await User.findById(req.currentUser.id, 'saved.playlists')
            .populate('saved.playlists')
            .exec();
        res.json(user.saved.playlists);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserPodcasts = async (
    req: IGetUserAuthInfoRequest,
    res: Response
) => {
    try {
        const user = await User.findById(req.currentUser.id, 'saved.podcasts')
            .populate('saved.podcasts')
            .exec();
        res.json(user.saved.podcasts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const saveUser = async (req: Request, res: Response) => {
    checkValidation(req, res);
    await hashPassword(req);

    try {
        const found = await User.findOne({
            $or: [
                { email: req.params.email },
                { username: req.params.username },
            ],
        }).exec();

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
        const { extractedPassword, ...userWithoutPassword } = user.toJSON();
        const token = setToken(userWithoutPassword.id, true);
        res.send({ user: { ...userWithoutPassword, token } });
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    checkValidation(req, res);
    await hashPassword(req);

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
        let user = await User.findOne({
            $or: [{ email: login }, { username: login }],
        })
            .select('id email username password images type product gender')
            .exec();

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

        const token = setToken(user.id, remember);
        const { extractedPassword, ...userWithoutPassword } = user;
        res.send({ user: { ...userWithoutPassword, token } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const setToken = (id: number, remember: boolean) => {
    const secret = process.env.SECRET_JWT || '';
    const token = jwt.sign({ userId: id.toString() }, secret, {
        expiresIn: remember ? '7d' : '24h',
    });
    return token;
};

const hashPassword = async (req: Request) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
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