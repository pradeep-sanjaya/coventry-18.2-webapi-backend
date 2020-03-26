import handleCategoryRequest from './';
import normalizedRequest from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';
import { successResponse, errorResponse } from '../helpers/response/response-dispatcher';
import { fieldStateChecker } from '../middlewares/field-validator';

export default function categoryController(req, res) {
    const fieldErrors = fieldStateChecker(req);
    const httpRequest = normalizedRequest(req);

    if (fieldErrors && fieldErrors.length) {
        return errorResponse(res, {
            code: HttpResponseType.UNPROCESSABLE_ENTITY,
            message: fieldErrors.join(', ')
        });
    }

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
                message: error.message
            });
        });
}
