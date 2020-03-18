import handleCategoryRequest from './';
import normalizedRequest from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';
import { successResponse, errorResponse } from '../helpers/response/response-dispatcher';

export default function categoryController(req, res) {
    const httpRequest = normalizedRequest(req);
    handleCategoryRequest(httpRequest)
        .then(({
            data
        }) => {
            if (data.status) {
                successResponse(res, data);
            } else {
                errorResponse(res, data);
            }
        }
        )
        .catch((error) => {
            errorResponse(res, {
                code: HttpResponseType.INTERNAL_SERVER_ERROR,
                message: error.message});
        });
}
