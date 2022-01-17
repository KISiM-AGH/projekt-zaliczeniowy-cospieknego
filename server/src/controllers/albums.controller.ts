import { Request, Response } from 'express';
import { Album } from '../models';

export const getAlbums = async (req: Request, res: Response) => {
    try {
        const albums = await Album.find()
            .populate('artists')
            .populate('tracks')
            .exec();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAlbumById = async (req: Request, res: Response) => {
    try {
        const album = await Album.findById(req.params.id)
            .populate('artists')
            .populate({
                path: 'tracks',
                populate: [
                    {
                        path: 'album',
                    },
                    {
                        path: 'artists',
                    },
                ],
            })
            .exec();
        res.json(album);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const saveAlbum = async (req: Request, res: Response) => {
    const album = new Album(req.body);

    try {
        const saved = await album.save().exec();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAlbum = async (req: Request, res: Response) => {
    const album = await Album.findById(req.params.id).exec();
    if (!album) return res.status(404).json({ message: 'Album was not found' });

    try {
        const updated = await Album.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAlbum = async (req: Request, res: Response) => {
    const album = await Album.findById(req.params.id).exec();
    if (!album) return res.status(404).json({ message: 'Album not found' });

    try {
        const deleted = await Album.deleteOne({ _id: req.params.id });
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
