import makeHttpError from '../helpers/validators/http-error';
import HttpResponseType from '../models/http-response-type';

export default function makeProductsEndpointHandler({
	productList
}) {
	return async function handle(httpRequest) {
		switch (httpRequest.path) {
		case '/':
			switch (httpRequest.method) {
			case 'POST':
				return postProduct(httpRequest);

			case 'GET':
				return getProducts(httpRequest);

			default:
				return makeHttpError({
					statusCode: HttpResponseType.METHOD_NOT_ALLOWED,
					errorMessage: `${httpRequest.method} method not allowed.`
				});
			}
		case '/category':

			switch (httpRequest.method) {
			case 'POST':
				return addCategory(httpRequest);

			case 'GET':
				return getCategories(httpRequest);

			default:
				return makeHttpError({
					statusCode: HttpResponseType.METHOD_NOT_ALLOWED,
					errorMessage: `${httpRequest.method} method not allowed.`
				});
			}
		default:
			return makeHttpError({
				statusCode: HttpResponseType.METHOD_NOT_ALLOWED,
				errorMessage: `${httpRequest.method} method not allowed.`
			});
		}
	};

	async function getProducts(httpRequest) {
		const {
			id
		} = httpRequest.pathParams || {};
		const {
			max,
			before,
			after
		} = httpRequest.queryParams || {};

		// const result = id ? {
		//   "product": {
		//     "id": 1,
		//     "name": "dildo",
		//   }
		// } : {
		//   "product": {
		//
		//     "name": "product found",
		//   }
		// }
		const result = await productList.getProducts();
		return {
			headers: {
				'Content-Type': 'application/json'
			},
			statusCode: HttpResponseType.SUCCESS,
			data: JSON.stringify({
				result
			})
		};
	}

	async function postProduct(httpRequest) {
		let result = await productList.add({
			'product': httpRequest.body
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

	}
	async function addCategory(httpRequest) {
		let result = await productList.addCategory({
			'category': httpRequest.body
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
	}

	async function getCategories(httpRequest) {
		const {
			id
		} = httpRequest.pathParams || {};
		const {
			max,
			before,
			after
		} = httpRequest.queryParams || {};

		let result =  await productList.getCategories();

		return {
			headers: {
				'Content-Type': 'application/json'
			},
			statusCode: HttpResponseType.SUCCESS,
			data: JSON.stringify({
				result
			})
		};
	}
}
