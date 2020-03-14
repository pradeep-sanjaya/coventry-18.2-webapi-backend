import handleUsersRequest from './'

import normalizedRequest from '../helpers/normalize-request'
import {INTERNAL_SERVER_ERROR} from "../helpers/http-request/response";

export default function usersController(req, res) {
    const httpRequest = normalizedRequest(req);
    handleUsersRequest(httpRequest)
        .then(({
                headers,
                statusCode,
                data
            }) =>
            res
            .set(headers)
            .status(statusCode)
            .send(data)
        )
        .catch(e => res.status(INTERNAL_SERVER_ERROR).end())
}