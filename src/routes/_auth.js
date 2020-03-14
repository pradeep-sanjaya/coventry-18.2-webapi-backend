import express from 'express';
var _authrouter = express.Router();
import authController from '../helpers/auth/auth-controller'

/* GET users login. */
_authrouter.post('/login', function (req, res, next) {
    authController(req,res)
});

/* GET users register. */
_authrouter.post('/register', function (req, res, next) {
    authController(req,res)
});

module.exports = _authrouter;