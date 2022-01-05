import { Router } from 'express';
import controller from '../controllers/songs.controller';

const router = Router();

try {
    router.get('/tracks', controller.getSongs);
    router.get('/tracks/?duration=:time', controller.getSongs);
    // router.get('/tracks/:id', controller.getSongById);
    router.get('/tracks/:title', controller.getSongByTitle);
    router.post('/tracks', controller.addSong);
    router.patch('/tracks/:id', controller.updateSong);
    router.delete('/tracks/:id', controller.deleteSong);
} catch (error) {
    console.error(error);
}

export = router;
