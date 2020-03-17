import jwt from 'jsonwebtoken';

import config from '../config/config';
import HttpResponseType from '../models/http-response-type';

import { errorResponse } from '../helpers/response/response-dispatcher';

//token check middleware
export default function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, config.jwtSecret, (error, user) => {
            if (error) {
                return errorResponse(res, HttpResponseType.FORBIDDEN, error.message);
            }
            req.user = user;
            next();
        });
    } else {
        return errorResponse(res, HttpResponseType.AUTH_REQUIRED, 'Unauthorized to access this resource');
    }
}
