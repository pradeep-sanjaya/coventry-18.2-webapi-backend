import HttpResponseType from '../models/http-response-type';
import { encodeUrl } from '../helpers/utilities/url-parser';

function objectHandler(data) {
    return {
        headers: { 'Content-Type': 'application/json' },
        data: data
    };
}

export default function makeProductsEndpointHandler({
    productList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
        case 'POST':
            return postProduct(httpRequest);

        case 'GET':
            return getProducts(httpRequest);

        case 'DELETE':
            return deleteProduct(httpRequest);

        default:
            return objectHandler({
                statusCode: HttpResponseType.METHOD_NOT_ALLOWED,
                errorMessage: `${httpRequest.method} method not allowed`
            });
        }
    };

    async function getAllProducts(httpRequest) {
        try {
            const {
                id
            } = httpRequest.pathParams || {};
            const {
                max,
                before,
                after
            } = httpRequest.queryParams || {};

            let result = null;

            if (!id) {
                result = await productList.getAllProducts();
            } else {
                result = await productList.findProductById({ id });
            }

            return objectHandler({
                status: HttpResponseType.SUCCESS,
                data: result,
                message: ''
            });
        } catch (error) {
            console.log(error.message);
            return objectHandler({
                code: HttpResponseType.INTERNAL_SERVER_ERROR,
                message: error.message
            });
        }
    }

    async function addProduct(httpRequest) {
        try {
            const body = httpRequest.body;
            if (body) {
                const productObj = {
                    style: body['style'],
                    productName: body['productName'],
                    category: body['category'],
                    availableQty: body['availableQty'],
                    isAvailable: body['isAvailable'],
                    unitPrice: body['unitPrice'],
                    availableSizes: body['availableSizes'],
                    availableColors: body['availableColors'],
                    imageUrl: encodeUrl(body['imageUrl'])
                };

                let data = await productList.addProduct(productObj);

                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    message: `${data.productName} created successful`
                });

            } else {
                return objectHandler({
                    code: HttpResponseType.CLIENT_ERROR,
                    message: 'Request body does not contain a body'
                });
            }
        } catch (error) {
            console.log(error.message);
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: error.message
            });
        }
    }

    async function deleteProduct(httpRequest) {
        const {
            id
        } = httpRequest.pathParams || {};

        let result = await productList.removeProduct({
            id
        });

        return objectHandler({
            status: HttpResponseType.SUCCESS,
            data: data
        });
    }
}
