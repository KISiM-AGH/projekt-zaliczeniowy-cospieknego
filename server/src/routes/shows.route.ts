import { Router } from 'express';
import {
    getShows,
    getShowById,
    saveShow,
    updateShow,
    deleteShow,
} from '../controllers/shows.controller';

const router = Router();

router.get('/shows', getShows);
router
    .route('/shows/:id')
    .get(getShowById)
    .put(saveShow)
    .patch(updateShow)
    .delete(deleteShow);

export default router;
