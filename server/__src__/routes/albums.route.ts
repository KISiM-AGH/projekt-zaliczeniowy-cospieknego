import { Router } from 'express';
import controller from '../controllers/albums.controller';

const router = Router();

try {
    router.get('/albums', controller.getAlbums);
    router.get('/albums/?year=:year', controller.getAlbums);
    router.get('/albums/?limit=:n', controller.getAlbums);
    router.get('/albums/:id', controller.getAlbumById);
    router.post('/albums', controller.addAlbum);
    router.patch('/albums/:id', controller.updateAlbum);
    router.delete('/albums/:id', controller.deleteAlbum);
} catch (error) {
    console.error(error);
}

export = router;
