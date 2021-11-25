import { Request, Response } from 'express';
import songModel from '../models/songs.model';
import HttpException from '../utils/httpException.utils';
import ISong from '../interfaces/song.interface';

const getSongs = async (req: Request, res: Response): Promise<void> => {
    const songs = await songModel.read(req.query);

    songs.length
        ? res.status(200).send(songs)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'No content',
              },
          });
};

const getSongById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const song: ISong = await songModel.find({ id });

    song.length
        ? res.status(200).send(song)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'Failed to find a song with the specific ID',
              },
          });
};

const getSongByTitle = async (req: Request, res: Response): Promise<void> => {
    const title: string = req.params.title;
    const song: ISong = await songModel.find({ title });

    song
        ? res.status(200).send(song)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'Failed to find a song with the specific name',
              },
          });
};

const addSong = async (req: Request, res: Response): Promise<void> => {
    const data: ISong = req.body;
    const result = await songModel.create(data);

    result
        ? res.status(201).send({ message: 'Added new song' })
        : res.status(304).send({
              error: {
                  code: 'errorNotAdded',
                  message: 'Failed to add new song',
              },
          });
};

const updateSong = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const data: ISong = req.body;
    const { affectedRows, changedRows, info } = await songModel.update(
        id,
        data
    );

    !affectedRows
        ? res.status(404).send({ message: 'Song not found', info })
        : affectedRows && changedRows
        ? res.status(200).send({ message: 'Song updated successfully', info })
        : res.status(304).send({ message: 'Song not modified', info });
};

const deleteSong = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const result = await songModel.delete(id);
    result
        ? res.status(200).send({ message: 'Song has been deleted' })
        : res.status(304).send({
              error: {
                  code: 'errorNotDeleted',
                  message: 'Song not deleted',
              },
          });
};

export default {
    getSongs,
    getSongById,
    getSongByTitle,
    addSong,
    updateSong,
    deleteSong,
};
