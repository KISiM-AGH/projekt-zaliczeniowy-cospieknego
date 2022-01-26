import { Router } from 'express';
import {
    getPlaylists,
    getPlaylistById,
    savePlaylist,
    updatePlaylist,
    deletePlaylist,
} from '../controllers/playlists.controller';

const router = Router();

router.get('/playlists', getPlaylists);
router
    .route('/playlists/:id')
    .get(getPlaylistById)
    .put(savePlaylist)
    .patch(updatePlaylist)
    .delete(deletePlaylist);

export default router;
