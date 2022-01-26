import { Router } from 'express';
import {
    getGenres,
    getGenreById,
    saveGenre,
    updateGenre,
    deleteGenre,
} from '../controllers/genres.controller';

const router = Router();

router.get('/genres', getGenres);
router
    .route('/genres/:id')
    .get(getGenreById)
    .put(saveGenre)
    .patch(updateGenre)
    .delete(deleteGenre);

export default router;
