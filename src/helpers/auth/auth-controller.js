import handleAuthRequest from './'

import normalizedRequest from '../normalize-request'
import {INTERNAL_SERVER_ERROR} from "../http-request/response";

export default function authController(req, res) {
    const httpRequest = normalizedRequest(req)

    handleAuthRequest(httpRequest)
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