import { Router } from 'express';
import {
    getArtists,
    getArtistById,
    saveArtist,
    updateArtist,
    deleteArtist,
} from '../controllers/artists.controller';

const router = Router();

router.get('/artists', getArtists);
router
    .route('/artists/:id')
    .get(getArtistById)
    .put(saveArtist)
    .patch(updateArtist)
    .delete(deleteArtist);

export default router;
