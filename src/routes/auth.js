import express from 'express';
import authController from '../auth/auth-controller';

let authRouter = express.Router();

authRouter.post('/login', (req, res) => {
    authController(req, res);
});

/* POST users register. */
authRouter.post('/register', (req, res) => {
    authController(req, res);
});

authRouter.post('/reset-password', (req, res) => {
    authController(req, res);
});

authRouter.put('/reset-password/:resetToken', (req, res) => {
    authController(req, res);
});

module.exports = authRouter;
