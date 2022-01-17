import { Router } from 'express';
import {
    getAlbums,
    getAlbumById,
    saveAlbum,
    updateAlbum,
    deleteAlbum,
} from '../controllers/albums.controller';

const router = Router();

router.get('/albums', getAlbums);
router
    .route('/albums/:id')
    .get(getAlbumById)
    .put(saveAlbum)
    .patch(updateAlbum)
    .delete(deleteAlbum);

export default router;
