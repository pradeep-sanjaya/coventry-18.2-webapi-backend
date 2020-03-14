import express from 'express';
var authRouter = express.Router();
import authController from '../helpers/auth/auth-controller'

/* GET users login. */
authRouter.post('/login', function (req, res, next) {
    authController(req,res)
});

/* POST users register. */
authRouter.post('/register', function (req, res, next) {
    authController(req,res)
});

module.exports = authRouter;