import { Request, Response } from 'express';
import { Playlist } from '../models';

export const getPlaylists = async (req: Request, res: Response) => {
    try {
        const playlists = await Playlist.find()
            .where('public')
            .equals(true)
            .populate('owner', 'id, username')
            .populate('tracks')
            .exec();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPlaylistById = async (req: Request, res: Response) => {
    try {
        const playlist = await Playlist.findById(req.params.id)
            .populate('owner', 'username type')
            .populate({
                path: 'tracks',
                populate: [
                    {
                        path: 'album',
                        select: 'images name type',
                    },
                    {
                        path: 'artists',
                        select: 'name',
                    },
                ],
            })
            .exec();
        res.json(playlist);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const savePlaylist = async (req: Request, res: Response) => {
    const playlist = new Playlist(req.body);

    try {
        const saved = await playlist.save().exec();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePlaylist = async (req: Request, res: Response) => {
    const playlist = await Playlist.findById(req.params.id).exec();
    if (!playlist)
        return res.status(404).json({ message: 'Playlist was not found' });

    try {
        const updated = await Playlist.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePlaylist = async (req: Request, res: Response) => {
    const playlist = await Playlist.findById(req.params.id).exec();
    if (!playlist)
        return res.status(404).json({ message: 'Playlist not found' });

    try {
        const deleted = await Playlist.deleteOne({ _id: req.params.id });
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
