import handleAuthRequest from './index';

import normalizedRequest from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';
import { successResponse, successResponseWithData, errorResponse } from '../helpers/response/response-dispatcher';

export default function authController(req, res) {
    const httpRequest = normalizedRequest(req);

    handleAuthRequest(httpRequest)
        .then(({
            headers,
            data
        }) => {
            if (data.status) {
                switch (httpRequest.path) {
                case '/login':
                    return successResponseWithData(res, data, headers);
                case '/register':
                    return successResponse(res, data.message, headers);
                }
            } else {
                return errorResponse(res, data.code, data.message);
            }
        })
        .catch((error) => {
            errorResponse(res, HttpResponseType.INTERNAL_SERVER_ERROR, error.message);
        });
}
