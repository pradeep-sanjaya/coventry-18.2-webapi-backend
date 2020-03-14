import jwt from 'jsonwebtoken';
import config from '../../config/config'
export default async function getAuthTokenforUser({
    user
}) {
    const accessToken = jwt.sign({
        username: user.username,
        role: user.role
    }, config.JWT_SECRET_KEY);

    return accessToken;
}
