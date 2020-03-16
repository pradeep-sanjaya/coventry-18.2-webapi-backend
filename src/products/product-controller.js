import handleProductRequest from './';
import normalizedRequest from '../helpers/normalize-request';
import HttpResponseType from '../models/http-response-type';

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
        .catch(e => res.status(HttpResponseType.INTERNAL_SERVER_ERROR).send(e));
}