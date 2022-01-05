import { body, CustomValidator } from 'express-validator';
import Role from '../../utils/userRoles.utils';

const isPasswordLongEnough: CustomValidator = (value, { req }) => {
    return !!req.body.confirm_password;
};

const doPasswordsMatch: CustomValidator = (value, { req }) => {
    return value === req.body.password;
};

const doEmailsMatch: CustomValidator = (value, { req }) => {
    return req.body.confirmEmail === req.body.email;
};

const isChecked: CustomValidator = (value) => {
    return value === true;
};

export const createUserSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('confirmEmail')
        .exists()
        .normalizeEmail()
        .custom(doEmailsMatch)
        .withMessage('Both email fields must have the same value'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters'),
    body('username')
        .exists()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    // birthDate
    body('hasAcceptedTos')
        .isBoolean()
        .withMessage('Must be a boolean value')
        .custom(isChecked)
        .withMessage('User did not agree to Terms of Service'),
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
        // .custom((value, { req }) => !!req.body.confirm_password)
        .withMessage('Please confirm your password'),
    body('confirm_password')
        .optional()
        .custom(doPasswordsMatch)
        .withMessage(
            '"Confirm password" field must have the same value as the password field'
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
    body('login').exists().withMessage('Email/username is required'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled'),
];
