import handleProductRequest from './'

import normalizedRequest from '../helpers/normalize-request'
import {INTERNAL_SERVER_ERROR} from "../helpers/http-request/response";

export default function productsController(req, res) {
    const httpRequest = normalizedRequest(req);
    handleProductRequest(httpRequest)
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
        .catch(e => res.status(INTERNAL_SERVER_ERROR).send(e));
}