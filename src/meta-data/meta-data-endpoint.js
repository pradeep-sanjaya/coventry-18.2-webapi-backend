import { objectHandler } from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';

export default function makeMetaDataEndpointHandler({
    metaDataList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
        case 'GET':
            return getDiscounts(httpRequest);
        case 'POST':
            return addDiscount(httpRequest);
        case 'PUT':
            return updateDiscount(httpRequest);
        case 'DELETE':
            return removeDiscount(httpRequest);
        default:
            return objectHandler({
                code: HttpResponseType.METHOD_NOT_ALLOWED,
                message: `${httpRequest.method} method not allowed`
            });
        }
    };

    async function getDiscounts(httpRequest) {
        const { id } = httpRequest.pathParams;
        if (id) {
            try {
                const result = await metaDataList.findByDiscountId(id);
                if (result) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: result,
                        message: ''
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.CLIENT_ERROR,
                        message: `Provided discount id '${id}' is missing or invalid`
                    });
                }
            } catch (error) {
                return objectHandler({
                    code: HttpResponseType.INTERNAL_SERVER_ERROR,
                    message: error.message
                });
            }
        } else {
            try {
                const result = await metaDataList.getAllDiscounts();
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

    async function addDiscount(httpRequest) {
        const { discountCode, deductiblePercentage } = httpRequest.body;
        try {
            if (discountCode && deductiblePercentage) {
                const result = await metaDataList.addDiscountCode({ discountCode, deductiblePercentage });

                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: result,
                    message: `Discount '${result.discountCode}' added successful`
                });

            } else {
                return objectHandler({
                    code: HttpResponseType.CLIENT_ERROR,
                    message: 'Required fields are missing or invalid'
                });
            }
        } catch (error) {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: error.code === 11000 ? `Discount code '${discountCode}' is already exists` : error.message
            });
        }
    }

    async function updateDiscount(httpRequest) {
        const { id } = httpRequest.pathParams;
        const { discountCode, deductiblePercentage } = httpRequest.body;
        if (id && discountCode && deductiblePercentage) {
            try {
                const timestamp = new Date().getTime();
                const data = {
                    timestamp,
                    discountCode,
                    deductiblePercentage
                };
                const result = await metaDataList.updateDiscount(id, data);

                if (result) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: result,
                        message: `Discount '${id}' updated successful`
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.CLIENT_ERROR,
                        message: 'Required fields are missing or invalid'
                    });
                }
            } catch (error) {
                return objectHandler({
                    code: HttpResponseType.INTERNAL_SERVER_ERROR,
                    message: error.message
                });
            }
        } else {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: 'Required fields are missing or invalid'
            });
        }
    }

    async function removeDiscount(httpRequest) {
        const { id } = httpRequest.pathParams;

        if (id) {
            let result = await metaDataList.removeDiscount(id);
            if (result && result.deletedCount) {
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: result,
                    message: `Discount '${id}' record is deleted successful`
                });
            } else {
                return objectHandler({
                    code: HttpResponseType.NOT_FOUND,
                    message: `Requested discount '${id}' not found in discount codes`
                });
            }
        } else {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: 'Required path parameter missing or invalid'
            });
        }
    }
}
