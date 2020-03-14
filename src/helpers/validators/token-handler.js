import jwt from 'jsonwebtoken';
import config from '../../config/config'
export default async function getAuthTokenforUser({
    user
}) {
    const accessToken = jwt.sign({
        username: user.username,
        role: user.role,
        expiresIn:  60
    }, config.jwtSecret);

    return accessToken;
}
