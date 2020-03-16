import express from 'express';
let authRouter = express.Router();

import authController from '../helpers/auth/auth-controller';

authRouter.post('/login',  (req, res, next) => {
	authController(req,res);
});

/* POST users register. */
authRouter.post('/register',  (req, res, next) => {
	authController(req,res);
});

module.exports = authRouter;
