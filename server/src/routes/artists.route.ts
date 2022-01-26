import { Router } from 'express';
import {
    getArtists,
    getArtistById,
    getArtistContent,
    saveArtist,
    updateArtist,
    deleteArtist,
} from '../controllers/artists.controller';

const router = Router();

router.get('/artists', getArtists);
router.get('/artists/:id/:type', getArtistContent);
router
    .route('/artists/:id')
    .get(getArtistById)
    .put(saveArtist)
    .patch(updateArtist)
    .delete(deleteArtist);

export default router;
