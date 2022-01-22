import { Request, Response } from 'express';
import { Album, Artist, Track } from '../models';

export const getArtists = async (req: Request, res: Response) => {
    try {
        const skip = parseInt(req.query.skip as string) || 0;
        const limit = parseInt(req.query.limit as string) || 50;
        const artists = await Artist.find().skip(skip).limit(limit).exec();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getArtistById = async (req: Request, res: Response) => {
    try {
        const artist = await Artist.findById(req.params.id).exec();
        res.json(artist);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getArtistContent = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 20;
        const sortBy = req.query.sort_by || '_id';

        if (req.params.type === 'albums') {
            const albums = await Album.find({ artists: req.params.id })
                .where('type')
                .equals('album')
                .sort(sortBy)
                .select(
                    'name type images popularity release_date release_date_precision'
                )
                .exec();
            res.json(albums);
            return;
        } else if (req.params.type === 'singles') {
            const tracks = await Track.find({ artists: req.params.id })
                .where('type')
                .equals('single')
                .sort(sortBy)
                .limit(limit)
                .select(
                    'name type images popularity release_date release_date_precision'
                )
                .populate('album', '-tracks')
                .populate('artists', 'id name type images')
                .exec();
            res.json(tracks);
            return;
        } else if (req.params.type === 'top-tracks') {
            const limit = parseInt(req.query.limit as string) || 20;
            const tracks = await Track.find({ artists: req.params.id })
                .sort('-popularity')
                .limit(limit)
                .select('name type album duration explicit')
                .populate('album', '-tracks')
                .populate('artists', 'id name type images')
                .exec();
            res.json(tracks);
            return;
        }
        res.status(404).json({ message: 'Not found' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const saveArtist = async (req: Request, res: Response) => {
    const artist = new Artist(req.body);

    try {
        const saved = await artist.save().exec();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateArtist = async (req: Request, res: Response) => {
    const artist = await Artist.findById(req.params.id).exec();
    if (!artist)
        return res.status(404).json({ message: 'Artist was not found' });

    try {
        const updated = await Artist.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteArtist = async (req: Request, res: Response) => {
    const artist = await Artist.findById(req.params.id).exec();
    if (!artist)
        return res.status(404).json({ message: 'Artist was not found' });

    try {
        const deleted = await Artist.deleteOne({ _id: req.params.id });
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
