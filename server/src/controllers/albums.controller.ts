import { Request, Response } from 'express';
import albumModel from '../models/albums.model';
import HttpException from '../utils/httpException.utils';
import IAlbum from '../interfaces/album.interface';

const getAlbums = async (req: Request, res: Response): Promise<void> => {
    const albums = await albumModel.read(req.query);

    albums.length
        ? res.status(200).send(albums)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'No content',
              },
          });
};

const getAlbumById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const album: IAlbum = await albumModel.find({ id });

    album.length
        ? res.status(200).send(album)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'Failed to find an album with the specific ID',
              },
          });
};

const getAlbumByTitle = async (req: Request, res: Response): Promise<void> => {
    const name: string = req.params.title;
    const album: IAlbum = await albumModel.find({ name });

    album
        ? res.status(200).send(album)
        : res.status(204).send({
              error: {
                  code: 'errorNoResults',
                  message: 'Failed to find an album with the specific name',
              },
          });
};

const addAlbum = async (req: Request, res: Response): Promise<void> => {
    const data: IAlbum = req.body;
    const result = await albumModel.create(data);

    result
        ? res.status(201).send({ message: 'Added new album' })
        : res.status(304).send({
              error: {
                  code: 'errorNotAdded',
                  message: 'Failed to add new album',
              },
          });
};

const updateAlbum = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const data: IAlbum = req.body;
    const { affectedRows, changedRows, info } = await albumModel.update(
        id,
        data
    );

    !affectedRows
        ? res.status(404).send({ message: 'Album not found', info })
        : affectedRows && changedRows
        ? res.status(200).send({ message: 'Album updated successfully', info })
        : res.status(304).send({ message: 'Album not modified', info });
};

const deleteAlbum = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const result = await albumModel.delete(id);
    result
        ? res.status(200).send({ message: 'Album has been deleted' })
        : res.status(304).send({
              error: {
                  code: 'errorNotDeleted',
                  message: 'Album not deleted',
              },
          });
};

export default {
    getAlbums,
    getAlbumById,
    getAlbumByTitle,
    addAlbum,
    updateAlbum,
    deleteAlbum,
};
