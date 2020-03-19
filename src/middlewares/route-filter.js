import jwt from 'jsonwebtoken';

import config from '../config/config';
import HttpResponseType from '../models/http-response-type';

import { errorResponse } from '../helpers/response/response-dispatcher';

//token check middleware
export default function filterRoute(req, res, next) {
    const authHeader = req.headers.authorization;
    const { method } = req;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, config.jwtSecret, (error, user) => {
            if (error) {
                return errorResponse(res, {
                    code: HttpResponseType.FORBIDDEN,
                    message: error.message
                });
            }
            const { role } = user;
            switch (role) {
            case 'Admin':
                req.user = user;
                next();
                break;
            case 'Customer':
                switch (method) {
                case 'PUT':
                case 'DELETE':
                case 'POST':
                case 'PATCH':
                    return errorResponse(res, {
                        code: HttpResponseType.FORBIDDEN,
                        message: 'Insufficient permissions to access this resource'
                    });
                default:
                    next();
                    break;
                }
                break;
            default:
                return errorResponse(res, {
                    code: HttpResponseType.FORBIDDEN,
                    message: 'Insufficient permissions to access this resource'
                });
            }
        });
    } else {
        return errorResponse(res, {
            code: HttpResponseType.AUTH_REQUIRED,
            message: 'Unauthorized to access this resource'
        });
    }
}
