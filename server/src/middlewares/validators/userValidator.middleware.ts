import { body, CustomValidator } from 'express-validator';
import Role from '../../utils/userRoles.utils';

const isPasswordLongEnough: CustomValidator = (value, { req }) => {
    return !!req.body.confirm_password;
};

const doPasswordsMatch: CustomValidator = (value, { req }) => {
    return value === req.body.password;
};

export const createUserSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('username')
        .exists()
        .withMessage('username is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage('Password must contain at least 4 characters'),
    body('confirm_password')
        .exists()
        .custom(isPasswordLongEnough)
        .withMessage(
            'confirm_password field must have the same value as the password field'
        ),
    body('image_url').optional(),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.RegularUser, Role.PremiumUser])
        .withMessage('Invalid Role type'),
];

export const updateUserSchema = [
    body('email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('username')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('password')
        .optional()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        //.custom((value, { req }) => !!req.body.confirm_password)
        .withMessage('Please confirm your password'),
    body('confirm_password')
        .optional()
        .custom(doPasswordsMatch)
        .withMessage(
            'confirm_password field must have the same value as the password field'
        ),
    body('image_url').optional(),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.RegularUser, Role.PremiumUser])
        .withMessage('Invalid Role type'),
    body()
        .custom((value: string) => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom((value: string) => {
            const updates = Object.keys(value);
            const allowUpdates = [
                'email',
                'username',
                'password',
                'confirm_password',
                'image_url',
                'role',
            ];
            return updates.every((update) => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!'),
];

export const validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled'),
];
