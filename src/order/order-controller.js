import handleOrderRequest from './';

import normalizedRequest from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';
import { successResponse, errorResponse } from '../helpers/response/response-dispatcher';

export default function orderController(req, res) {
    const httpRequest = normalizedRequest(req);

    handleOrderRequest(httpRequest)
        .then(({ data }) => {
            if (data.status) {
                return successResponse(res, data);
            } else {
                return errorResponse(res, data);
            }
        })
        .catch((error) => {
            errorResponse(res, {
                code: HttpResponseType.INTERNAL_SERVER_ERROR,
                message: error.message
            });
        });
}
