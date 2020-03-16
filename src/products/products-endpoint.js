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
        switch (httpRequest.path) {
        case '/':
            switch (httpRequest.method) {
            case 'POST':
                return addProduct(httpRequest);
            case 'GET':
                return getAllProducts();
            default:
                return objectHandler({
                    code: HttpResponseType.METHOD_NOT_ALLOWED,
                    message: `${httpRequest.method} method not allowed`
                });
            }

        case '/categories':
            switch (httpRequest.method) {
            case 'POST':
                return addCategory(httpRequest);
            case 'GET':
                return getAllCategories();
            default:
                return objectHandler({
                    code: HttpResponseType.METHOD_NOT_ALLOWED,
                    message: `${httpRequest.method} method not allowed`
                });
            }
        default:
            return objectHandler({
                code: HttpResponseType.METHOD_NOT_ALLOWED,
                message: `${httpRequest.method} method not allowed`
            });
        }
    };

    async function getAllProducts() {
        try {
            const data = await productList.getAllProducts();

            return objectHandler({
                status: HttpResponseType.SUCCESS,
                data: data,
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

    async function addCategory(httpRequest) {
        try {
            const body = httpRequest.body;
            if (body) {
                const categoryObj = {
                    category: body['category'],
                    style: body['style'],
                    imageUrl: encodeUrl(body['imageUrl'])
                };

                let data = await productList.addCategory(categoryObj);
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    message: `${data.category} created successful`
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

    async function getAllCategories() {
        try {
            let data = await productList.getAllCategories();
            return objectHandler({
                status: HttpResponseType.SUCCESS,
                data: data,
                message: ''
            });
        } catch (error) {
            console.log(error);
            return objectHandler({
                code: HttpResponseType.INTERNAL_SERVER_ERROR,
                message: error.message
            });
        }
    }
}
