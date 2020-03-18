import { encodeUrl } from '../helpers/utilities/url-parser';

import HttpResponseType from '../models/http-response-type';

function objectHandler(data) {
    return {
        headers: { 'Content-Type': 'application/json' },
        data: data
    };
}

export default function makeCategoriesEndpointHandler({
    categoryList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
        case 'POST':
            return addCategory(httpRequest);
        case 'GET':
            return getCategories(httpRequest);
        case 'DELETE':
            return deleteCategory(httpRequest);
        case 'PUT':
            return updateCategory(httpRequest);
        default:
            return objectHandler({
                code: HttpResponseType.METHOD_NOT_ALLOWED,
                message: `${httpRequest.method} method not allowed`
            });
        }
    };

    async function addCategory(httpRequest) {
        try {
            const body = httpRequest.body;
            if (body) {
                const categoryObj = {
                    name: body['name'],
                    imageUrl: encodeUrl(body['imageUrl'])
                };

                let data = await categoryList.addCategory(categoryObj);

                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    message: `${data.name} created successful`
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

    async function getCategories(httpRequest) {
        let result = null;
        const pathParams = httpRequest.pathParams;
        if (!pathParams.id) {
            try {
                result = await categoryList.getAllCategories();
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
                result = await categoryList.findCategoryById(pathParams.id);
                if (result && result.length) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: result,
                        message: ''
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.NOT_FOUND,
                        message: `Requested '${pathParams.id}' not found in categories`
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

    async function deleteCategory(httpRequest) {
        const pathParams = httpRequest.pathParams;

        try {
            let result = await categoryList.removeCategory(pathParams.id);

            if (result && result.deletedCount) {
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: `'${pathParams.id}' record is deleted successful`,
                    message: ''
                });
            } else {
                return objectHandler({
                    code: HttpResponseType.NOT_FOUND,
                    message: `Requested '${pathParams.id}' not found in categories`
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
    async function updateCategory(httpRequest) {
        const { id } = httpRequest.pathParams || '';
        const { body } = httpRequest;

        console.log(body);
        try {
            let result = await categoryList.updateCategory({id,body});
            console.log(result);
        }catch (error) {
            console.log(error.message);
            return objectHandler({
                code: HttpResponseType.INTERNAL_SERVER_ERROR,
                message: error.message
            });
        }
    }
}
