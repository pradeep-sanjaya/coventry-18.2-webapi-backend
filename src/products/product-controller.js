import handleProductRequest from './'

import normalizedRequest from '../helpers/normalize-request'

export default function productsController(req, res) {
    const httpRequest = normalizedRequest(req)
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
        .catch(e => res.status(500).end())
}