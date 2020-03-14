import handleUsersRequest from './'

import normalizedRequest from '../helpers/normalize-request'

export default function usersController(req, res) {
    const httpRequest = normalizedRequest(req)
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
        .catch(e => res.status(500).end())
}