import { Request, Response } from 'express';
import { Show } from '../models';

export const getShows = async (req: Request, res: Response) => {
    try {
        const shows = await Show.find().exec();
        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getShowById = async (req: Request, res: Response) => {
    try {
        const show = await Show.findById(req.params.id).exec();
        res.json(show);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const saveShow = async (req: Request, res: Response) => {
    const show = new Show(req.body);

    try {
        const saved = await show.save().exec();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateShow = async (req: Request, res: Response) => {
    const show = await Show.findById(req.params.id).exec();
    if (!show) return res.status(404).json({ message: 'Show was not found' });

    try {
        const updated = await Show.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteShow = async (req: Request, res: Response) => {
    const show = await Show.findById(req.params.id).exec();
    if (!show) return res.status(404).json({ message: 'Show not found' });

    try {
        const deleted = await Show.deleteOne({ _id: req.params.id });
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
