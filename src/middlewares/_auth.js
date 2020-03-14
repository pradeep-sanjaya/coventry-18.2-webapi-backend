import jwt from 'jsonwebtoken';
import config from '../config/config'

//token check middleware
export default function authenticateJWT(req, res, next) {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.jwtSecret, (err, user) => {

            if (err) {

                return res.sendStatus(403);
            }
            req.user = user;

            next();
        });

    } else {

        res.sendStatus(401);

    }
};