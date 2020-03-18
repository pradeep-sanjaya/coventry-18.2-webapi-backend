import { objectHandler } from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';

export default function makeMetaDataEndpointHandler({
    metaDataList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.path) {
        case '/secret-questions':
            return getSecretQuestions();
        default:
            return objectHandler({
                code: HttpResponseType.METHOD_NOT_ALLOWED,
                message: `${httpRequest.method} method not allowed`
            });
        }
    };

    async function getSecretQuestions() {
        let result = null;
        try {
            result = await metaDataList.getSecretQuestions();
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
    }
}
