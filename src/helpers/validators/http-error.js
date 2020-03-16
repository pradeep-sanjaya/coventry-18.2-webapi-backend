import * as statusMapper from '../utilities/http-error-status-mapper';

export default function makeHttpError ({ statusCode, errorMessage }) {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode: statusCode,
        data: JSON.stringify({
            error: {
                code: statusMapper.httpErrorStatusMapper(statusCode),
                message: errorMessage
            }
        })
    };
}
