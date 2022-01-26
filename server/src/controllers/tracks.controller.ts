import { Request, Response } from 'express';
import { Track } from '../models';

export const getTracks = async (req: Request, res: Response) => {
    const field = req.query.sort || 'id';
    const limit = parseInt(req.query.limit as string) || 50;

    try {
        const tracks = await Track.find()
            .sort(`-${field}`)
            .limit(limit)
            .populate('artists')
            .populate('album')
            .exec();
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTrackById = async (req: Request, res: Response) => {
    try {
        const track = await Track.findById(req.params.id).exec();
        res.json(track);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const saveTrack = async (req: Request, res: Response) => {
    const track = new Track(req.body);

    try {
        const saved = await track.save().exec();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTrack = async (req: Request, res: Response) => {
    const track = await Track.findById(req.params.id).exec();
    if (!track) return res.status(404).json({ message: 'Track was not found' });

    try {
        const updated = await Track.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTrack = async (req: Request, res: Response) => {
    const track = await Track.findById(req.params.id).exec();
    if (!track) return res.status(404).json({ message: 'Track was not found' });

    try {
        const deleted = await Track.deleteOne({ _id: req.params.id });
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
