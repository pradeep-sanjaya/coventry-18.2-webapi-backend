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
            return addProduct(httpRequest);
        case 'GET':
            return getProducts(httpRequest);
        case 'DELETE':
            return deleteProduct(httpRequest);
        default:
            return objectHandler({
                code: HttpResponseType.METHOD_NOT_ALLOWED,
                message: `${httpRequest.method} method not allowed`
            });
        }
    };

    async function getProducts(httpRequest) {
        let result = null;
        const pathParams = httpRequest.pathParams;
        if (!pathParams.id) {
            try {
                result = await productList.getAllProducts();
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: result,
                    message: ''
                });
            } catch (error) {
                return objectHandler({
                    code: HttpResponseType.INTERNAL_SERVER_ERROR,
                    message: error.message
                });
            }
        } else {
            try {
                result = await productList.findProductById(pathParams.id);
                if (result && result.length) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: result,
                        message: ''
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.NOT_FOUND,
                        message: `Requested '${pathParams.id}' not found in products`
                    });
                }
            } catch (error) {
                return objectHandler({
                    code: HttpResponseType.INTERNAL_SERVER_ERROR,
                    message: error.message
                });
            }
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
                    message: `'${data.productName}' created successful`
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
        const pathParams = httpRequest.pathParams;

        try {
            let result = await productList.removeProduct(pathParams.id);

            if (result && result.deletedCount) {
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: `'${pathParams.id}' record is deleted successful`,
                    message: ''
                });
            } else {
                return objectHandler({
                    code: HttpResponseType.NOT_FOUND,
                    message: `Requested '${pathParams.id}' not found in products`
                });
            }
        } catch (error) {
            console.log(error.message);
            return objectHandler({
                code: HttpResponseType.INTERNAL_SERVER_ERROR,
                message: error.message
            });
        }
    }
}
