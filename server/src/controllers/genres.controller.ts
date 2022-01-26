import { Request, Response } from 'express';
import { Genre } from '../models';

export const getGenres = async (req: Request, res: Response) => {
    try {
        const genres = await Genre.find().exec();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getGenreById = async (req: Request, res: Response) => {
    try {
        const genre = await Genre.findById(req.params.id).exec();
        res.json(genre);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const saveGenre = async (req: Request, res: Response) => {
    const genre = new Genre(req.body);

    try {
        const saved = await genre.save().exec();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateGenre = async (req: Request, res: Response) => {
    const genre = await Genre.findById(req.params.id).exec();
    if (!genre) return res.status(404).json({ message: 'Genre not found' });

    try {
        const updated = await Genre.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteGenre = async (req: Request, res: Response) => {
    const genre = await Genre.findById(req.params.id).exec();
    if (!genre) return res.status(404).json({ message: 'Genre not found' });

    try {
        const deleted = await Genre.deleteOne({ _id: req.params.id });
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
