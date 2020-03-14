import handleAuthRequest from './'

import normalizedRequest from '../normalize-request'

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
        .catch(e => res.status(500).end())
}