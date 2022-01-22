import { Router } from 'express';
import awaitHandlerFactory from '../middlewares/awaitHandlerFactory.middleware';
import auth from '../middlewares/auth.middleware';
import ROLES from '../utils/userRoles.utils';
import {
    createUserSchema,
    updateUserSchema,
    validateLogin,
} from '../middlewares/validators/userValidator.middleware';
import {
    getUsers,
    getUserById,
    getCurrentUser,
    getUserTracks,
    getUserAlbums,
    getUserFollowing,
    getUserPlaylists,
    getUserShows,
    saveUser,
    updateUser,
    deleteUser,
    loginUser,
} from '../controllers/users.controller';

const router = Router();

router.get('/users', auth(), awaitHandlerFactory(getUsers));
router.get('/users/:id', auth(), awaitHandlerFactory(getUserById));
router.get('/auth', auth(), awaitHandlerFactory(getCurrentUser));
router.post('/login', validateLogin, awaitHandlerFactory(loginUser));
router.put('/users', createUserSchema, awaitHandlerFactory(saveUser));
router.patch('/users/:id', updateUserSchema, awaitHandlerFactory(updateUser));
router.delete('/users/:id', awaitHandlerFactory(deleteUser));

router.get('/me/following', auth(), awaitHandlerFactory(getUserFollowing));
router.get('/me/playlists', auth(), awaitHandlerFactory(getUserPlaylists));
router.get('/me/albums', auth(), awaitHandlerFactory(getUserAlbums));
router.get('/me/shows', auth(), awaitHandlerFactory(getUserShows));
router.get('/me/tracks', auth(), awaitHandlerFactory(getUserTracks));

// auth(ROLES.ADMIN) => for some verified users

export default router;
