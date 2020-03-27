import HttpResponseType from '../models/http-response-type';
import { encodeUrl } from '../helpers/utilities/url-parser';
import { objectHandler } from '../helpers/utilities/normalize-request';

export default function makeProductsEndpointHandler({
    productList,
    categoryList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
        case 'POST':
            return addProduct(httpRequest);
        case 'GET':
            if (httpRequest.queryParams && httpRequest.queryParams.category) {
                return getProductByCategory(httpRequest);
            }
            return getProducts(httpRequest);
        case 'DELETE':
            return deleteProduct(httpRequest);
        case 'PUT':
            return updateProduct(httpRequest);
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
                if (result && result._id) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: result,
                        message: ''
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.NOT_FOUND,
                        message: `Requested product '${pathParams.id}' not found in products`
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
        const { name, category, qty, isAvailable, price, imageUrl } = httpRequest.body;
        try {
            let categoryModel = await categoryList.findCategoryByName(category);

            if (categoryModel.length) {
                if (httpRequest.body) {

                    const productObj = {
                        name,
                        category,
                        qty,
                        isAvailable,
                        price,
                        imageUrl: encodeUrl(imageUrl)
                    };

                    let data = await productList.addProduct(productObj);

                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: data,
                        message: `'${data.name}' created successful`
                    });

                } else {
                    return objectHandler({
                        code: HttpResponseType.CLIENT_ERROR,
                        message: 'Request body does not contain a body'
                    });
                }
            } else {
                return objectHandler({
                    code: HttpResponseType.NOT_FOUND,
                    message: `Category ${category} not found`
                });
            }
        } catch (error) {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: error.code === 11000 ? `Product ${name} is already  exists` : error.message
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
                    data: result,
                    message: `Product '${pathParams.id}' deleted successful`
                });
            } else {
                return objectHandler({
                    code: HttpResponseType.NOT_FOUND,
                    message: `Requested product '${pathParams.id}' not found in products`
                });
            }
        } catch (error) {
            return objectHandler({
                code: HttpResponseType.INTERNAL_SERVER_ERROR,
                message: error.message
            });
        }
    }

    async function updateProduct(httpRequest) {
        const { id } = httpRequest.pathParams || '';
        const { name, category, qty, isAvailable, price, imageUrl } = httpRequest.body;

        try {
            let categoryModel = await categoryList.findCategoryByName(category);

            if (categoryModel.length) {
                const timestamp = new Date().getTime();
                const data = {
                    timestamp,
                    name,
                    category,
                    qty,
                    isAvailable,
                    price,
                    imageUrl
                };

                let product = await productList.updateProduct({ id, data });
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: product,
                    message: `Product '${id}' updated successful.`
                });
            } else {
                return objectHandler({
                    code: HttpResponseType.NOT_FOUND,
                    message: `Category ${category} not found.`
                });
            }

        } catch (error) {
            return objectHandler({
                code: HttpResponseType.NOT_FOUND,
                message: error.code === 11000 ? 'Product is already exists' : error.name === 'CastError' ? 'Product not found' : error.message
            });
        }
    }

    async function getProductByCategory(httpRequest) {
        const { category } = httpRequest.queryParams;
        try {
            let products = await productList.getProductByCategory(category);
            return objectHandler({
                status: HttpResponseType.SUCCESS,
                data: products,
                message: ''
            });
        } catch (error) {
            return objectHandler({
                code: HttpResponseType.INTERNAL_SERVER_ERROR,
                message: error.message
            });
        }
    }
}
