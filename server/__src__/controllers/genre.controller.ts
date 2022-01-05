import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import genreModel from '../models/genre.model';
import songModel from '../models/songs.model';
import IGenre from '../interfaces/genre.interface';

dotenv.config();

const getGenres = async (req: Request, res: Response): Promise<void> => {
    const genres = await genreModel.read(req.query);

    genres.length
        ? res.status(200).send(genres)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'No content',
              },
          });
};

const getGenreById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const genres: IGenre | IGenre[] = await genreModel.find({ id });

    genres.length
        ? res.status(200).send(genres)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'Failed to find tracks with the specific genre ID',
              },
          });
};

const getGenreBySlug = async (req: Request, res: Response): Promise<void> => {
    const slug: string = req.params.slug;
    const genres: IGenre | IGenre[] = await genreModel.find({ slug });

    genres
        ? res.status(200).send(genres)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message:
                      'Failed to find tracks with the specific genre name/slug',
              },
          });
};

const getLatestGenres = async (req: Request, res: Response): Promise<void> => {
    const tracks: any = await songModel.read(); // ORDER BY DESC !!!

    tracks
        ? res
              .status(200)
              .send({ genre: 'Nowe wydania', theme_color: '#e8115b', tracks })
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'Failed to find newest tracks',
              },
          });
};

const addGenre = async (req: Request, res: Response): Promise<void> => {
    const genre: IGenre = req.body;
    const result = await genreModel.create(genre);

    result
        ? res.status(201).send({ message: 'Added new genre' })
        : res.status(304).send({
              error: {
                  code: 'errorNotAdded',
                  message: 'Failed to add new genre',
              },
          });
};

const updateGenre = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const data: IGenre = req.body;
    const { affectedRows, changedRows, info } = await genreModel.update(
        id,
        data
    );

    !affectedRows
        ? res.status(404).send({ message: 'Genre not found', info })
        : affectedRows && changedRows
        ? res.status(200).send({ message: 'Genre updated successfully', info })
        : res.status(304).send({ message: 'Genre not modified', info });
};

const deleteGenre = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const result = await genreModel.delete(id);
    result
        ? res.status(200).send({ message: 'Genre has been deleted' })
        : res.status(304).send({
              error: {
                  code: 'errorNotDeleted',
                  message: 'Genre not deleted',
              },
          });
};

export default {
    getGenres,
    getGenreById,
    getGenreBySlug,
    getLatestGenres,
    addGenre,
    updateGenre,
    deleteGenre,
};
