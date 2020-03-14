import makeHttpError from '../helpers/validators/http-error';
import hashValue from '../helpers/hasher';
import HttpResponseType from '../models/http-response-type';

export default function makeUsersEndpointHandler({
	userList
}) {
	return async function handle(httpRequest) {
		switch (httpRequest.method) {
		case 'POST':
			return postUser(httpRequest.body);

		case 'GET':
			return getUser(httpRequest);

		default:
			return makeHttpError({
				statusCode: HttpResponseType.METHOD_NOT_ALLOWED,
				errorMessage: `${httpRequest.method} method not allowed.`
			});
		}
	};

	async function getUser(httpRequest) {
		const {
			id
		} = httpRequest.pathParams || {};
		const {
			max,
			before,
			after
		} = httpRequest.queryParams || {};

		return {
			headers: {
				'Content-Type': 'application/json'
			},
			statusCode: HttpResponseType.SUCCESS,
			data: JSON.stringify({})
		};
	}

	async function postUser({
		username,
		password,
		role
	}) {
		try {
			let result = await userList.add({
				'user': {
					username,
					'password': hashValue({
						password,
					}),
					role
				}
			});
			return {
				headers: {
					'Content-Type': 'application/json'
				},
				statusCode: HttpResponseType.SUCCESS,
				data: {
					result
				}

			};
		} catch ({
			errmsg
		}) {

			return makeHttpError({
				statusCode: HttpResponseType.MISDIRECTED_REQUEST,
				errorMessage: `${errmsg}.`
			});

		}
	}
}
