import { Router } from 'express';
import controller from '../controllers/genre.controller';

const router = Router();

try {
    router.get('/genres', controller.getGenres);
    // router.get('/genres/:id', controller.getGenreById);
    router.get('/genres/:slug', controller.getGenreBySlug);
    router.post('/genres', controller.addGenre);
    router.patch('/genres/:id', controller.updateGenre);
    router.delete('/genres/:id', controller.deleteGenre);
} catch (error) {
    console.error(error);
}

export = router;
