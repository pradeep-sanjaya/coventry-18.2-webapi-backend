import express from 'express';
let _authRouter = express.Router();

import authController from '../helpers/auth/auth-controller';

_authRouter.post('/login', function (req, res, next) {
	authController(req,res);
});

/* POST users register. */
_authRouter.post('/register', function (req, res, next) {
	authController(req,res);
});

module.exports = _authRouter;
