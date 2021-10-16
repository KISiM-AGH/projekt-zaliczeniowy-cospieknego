import { Router } from 'express';
import controller from '../controllers/songs.controller';

const router = Router();

router.get('/songs', controller.getSongs);
router.get('/songs/?duration=:time', controller.getSongs);
router.get('/songs/:id', controller.getSongById);
router.get('/songs/:title', controller.getSongById);
router.post('/songs', controller.addSong);
router.patch('/songs/:id', controller.updateSong);
router.delete('/songs/:id', controller.deleteSong);

export = router;
