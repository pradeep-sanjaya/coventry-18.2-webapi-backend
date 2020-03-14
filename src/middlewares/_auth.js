import jwt from 'jsonwebtoken';
import config from '../config/config'
import {AUTH_REQUIRED, FORBIDDEN} from "../helpers/http-request/response";

//token check middleware
export default function authenticateJWT(req, res, next) {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.jwtSecret, (err, user) => {

            if (err) {

                return res.sendStatus(FORBIDDEN);
            }
            req.user = user;

            next();
        });

    } else {

        res.sendStatus(AUTH_REQUIRED);

    }
};