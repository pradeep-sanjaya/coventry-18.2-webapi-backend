import makeHttpError from '../helpers/validators/http-error';
import HttpResponseType from '../models/http-response-type';

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

        default:
            return makeHttpError({
                statusCode: HttpResponseType.METHOD_NOT_ALLOWED,
                errorMessage: `${httpRequest.method} method not allowed.`
            });
        }
    };

    async function addCategory(httpRequest) {
        let result = await categoryList.add({
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
        let result = null;
        if (!id) {
            result = await categoryList.getCategories();
        } else {
            result = await categoryList.findCategoryById({
                id
            });
        }
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
    async function deleteCategory(httpRequest) {
        const {
            id
        } = httpRequest.pathParams || {};
        let result = await categoryList.remove({id});
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