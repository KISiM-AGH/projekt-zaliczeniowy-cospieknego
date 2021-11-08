import { Router } from 'express';
import controller from '../controllers/user.controller';
import awaitHandlerFactory from '../middlewares/awaitHandlerFactory.middleware';
import auth from '../middlewares/auth.middleware';
import Role from '../utils/userRoles.utils';
import {
    createUserSchema,
    updateUserSchema,
    validateLogin,
} from '../middlewares/validators/userValidator.middleware';

const router = Router();

router.get('/users/', auth(), awaitHandlerFactory(controller.getUsers));
router.get(
    '/users/id/:id',
    auth(),
    awaitHandlerFactory(controller.getUserById)
);
router.get(
    '/users/username/:username',
    auth(),
    awaitHandlerFactory(controller.getUserByName)
);
// router.get('/whoami', controller.getCurrentUser);
router.post(
    '/users/',
    createUserSchema,
    awaitHandlerFactory(controller.addUser)
);
router.patch(
    '/users/id/:id',
    auth(Role.Admin),
    awaitHandlerFactory(controller.updateUser)
);
router.delete(
    '/users/id/:id',
    auth(Role.Admin),
    awaitHandlerFactory(controller.deleteUser)
);
router.post('/login', validateLogin, awaitHandlerFactory(controller.userLogin));

export = router;
