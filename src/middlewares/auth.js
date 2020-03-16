import jwt from 'jsonwebtoken';

import config from '../config/config';
import HttpResponseType from '../models/http-response-type';

//token check middleware
export default function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                return res.sendStatus(HttpResponseType.FORBIDDEN);
            }
            req.user = user;
            next();
        });

    } else {
        res.sendStatus(HttpResponseType.AUTH_REQUIRED);
    }
}
