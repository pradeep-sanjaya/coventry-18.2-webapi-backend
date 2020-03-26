import express from 'express';

import authController from '../auth/auth-controller';
import { validate, fieldStateChecker } from '../middlewares/field-validator';

let authRouter = express.Router();

authRouter.post('/login',
    validate('auth', '/login', 'POST'),
    fieldStateChecker,
    (req, res) => {
        authController(req, res);
    });

/* POST users register. */
authRouter.post('/register',
    validate('auth', '/register', 'POST'),
    fieldStateChecker,
    (req, res) => {
        authController(req, res);
    });

authRouter.post('/reset-password',
    validate('auth', '/reset-password', 'POST'),
    fieldStateChecker,
    (req, res) => {
        authController(req, res);
    });

authRouter.put('/reset-password/:resetToken',
    validate('auth', '/reset-password', 'PUT'),
    fieldStateChecker,
    (req, res) => {
        authController(req, res);
    });

module.exports = authRouter;
