import jwt from 'jsonwebtoken';

import config from '../../config/config';

export default async function getAuthToken({
    user
}) {
    return jwt.sign({
        username: user.username,
        role: user.role
    }, config.jwtSecret);
}
