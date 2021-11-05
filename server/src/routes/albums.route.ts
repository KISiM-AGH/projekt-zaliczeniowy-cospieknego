import { Router } from 'express';
import controller from '../controllers/albums.controller';

const router = Router();

router.get('/albums', controller.getAlbums);
router.get('/albums/?year=:year', controller.getAlbums);
router.get('/albums/:id', controller.getAlbumById);
router.get('/albums/:title', controller.getAlbumByTitle);
router.post('/albums', controller.addAlbum);
router.patch('/albums/:id', controller.updateAlbum);
router.delete('/albums/:id', controller.deleteAlbum);

export = router;
