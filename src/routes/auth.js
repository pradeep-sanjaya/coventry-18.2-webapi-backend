import express from 'express';

let authRouter = express.Router();

import authController from '../auth/auth-controller';

authRouter.post('/login', (req, res) => {
    authController(req, res);
});

/* POST users register. */
authRouter.post('/register', (req, res) => {
    authController(req, res);
});

module.exports = authRouter;
