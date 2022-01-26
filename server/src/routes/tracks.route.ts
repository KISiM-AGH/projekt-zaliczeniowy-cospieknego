import { Router } from 'express';
import {
    getTracks,
    getTrackById,
    saveTrack,
    updateTrack,
    deleteTrack,
} from '../controllers/tracks.controller';

const router = Router();

router.get('/tracks', getTracks);
router
    .route('/tracks/:id')
    .get(getTrackById)
    .put(saveTrack)
    .patch(updateTrack)
    .delete(deleteTrack);

export default router;
