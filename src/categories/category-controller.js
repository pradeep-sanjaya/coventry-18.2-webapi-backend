import handleCategoryRequest from './';
import normalizedRequest from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';
import { successResponseWithData, errorResponse } from '../helpers/response/response-dispatcher';

export default function categoryController(req, res) {
    const httpRequest = normalizedRequest(req);
    handleCategoryRequest(httpRequest)
        .then(({
            headers,
            data
        }) => {
            if (data.status) {
                successResponseWithData(res, data, headers);
            } else {
                errorResponse(res, data.code, data.message);
            }
        }
        )
        .catch((error) => {
            errorResponse(res, HttpResponseType.INTERNAL_SERVER_ERROR, error.message);
        });
}
