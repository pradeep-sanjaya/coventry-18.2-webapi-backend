import HttpResponseType from '../../models/http-response-type';
import * as statusMapper from '../utilities/http-error-status-mapper';

const successResponse = (res, msg, headers) => {
    const data = {
        status: HttpResponseType.SUCCESS,
        message: msg,
        data: null
    };
    return res
        .set(headers)
        .status(HttpResponseType.SUCCESS)
        .json(data);
};

const successResponseWithData = (res, obj, headers) => {
    const data = {
        status: obj.status,
        message: obj.message,
        data: obj.data
    };
    return res
        .set(headers)
        .status(HttpResponseType.SUCCESS)
        .json(data);
};

const errorResponse = (res, status, message) => {
    const data = {
        error: {
            code: statusMapper.httpErrorStatusMapper(status),
            message: message
        }
    };
    return res.status(status).json(data);
};

module.exports = { successResponse, successResponseWithData, errorResponse };
