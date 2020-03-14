import handleAuthRequest from './';

import normalizedRequest from '../normalize-request';
import HttpResponseType from '../../models/http-response-type';

export default function authController(req, res) {
	const httpRequest = normalizedRequest(req);

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
		.catch(e => res.status(HttpResponseType.INTERNAL_SERVER_ERROR).end());
}
