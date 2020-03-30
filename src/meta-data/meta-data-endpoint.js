import {objectHandler} from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';

export default function makeMetaDataEndpointHandler({
    metaDataList,
    cartList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
        case 'GET':
            return getDiscounts(httpRequest);
        case 'POST':
            if (httpRequest.path === '/discount-codes/validate') {
                return validateDiscount(httpRequest);
            }
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
        const { discountCode } = httpRequest.pathParams;
        if (discountCode) {
            try {
                const result = await metaDataList.findByDiscountCode({ discountCode });
                if (result) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: result,
                        message: ''
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.CLIENT_ERROR,
                        message: `Provided discount code '${discountCode}' is missing or invalid`
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
                if (result && result.length) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: result,
                        message: ''
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
        const { discountCode } = httpRequest.pathParams;
        const { deductiblePercentage } = httpRequest.body;

        if (discountCode && deductiblePercentage) {
            try {
                const data = {
                    deductiblePercentage
                };

                const result = await metaDataList.updateDiscount(discountCode, data);
                if (result) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: result,
                        message: `Discount '${discountCode}' updated successful`
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.NOT_FOUND,
                        message: `Discount id '${discountCode}' is not found`
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
        const { discountCode } = httpRequest.pathParams;

        if (discountCode) {
            let result = await metaDataList.removeDiscount(discountCode);
            if (result && result.deletedCount) {
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: result,
                    message: `Discount '${discountCode}' record is deleted successful`
                });
            } else {
                return objectHandler({
                    code: HttpResponseType.NOT_FOUND,
                    message: `Requested discount '${discountCode}' not found in discount codes`
                });
            }
        } else {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: 'Required path parameter missing or invalid'
            });
        }
    }

    async function validateDiscount(httpRequest) {
        const { userId, discountCode } = httpRequest.body;
        const discount = await metaDataList.findByDiscountCode({ discountCode });

        if (discount) {
            const cart = await cartList.getTempProducts({ userId });
            if (cart) {
                const discountTotal = cart.netTotalPrice * (discount.deductiblePercentage/100);
                const total = cart.netTotalPrice;

                cart.discountCode = discountCode;
                cart.discountsDeducted = discountTotal;

                cart.grossTotalPrice = total;
                cart.netTotalPrice = total - discountTotal;

                const priceUpdatedCart = await cartList.updateTempProducts(userId, cart);

                if (priceUpdatedCart) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: priceUpdatedCart,
                        message: `Discount id '${discountCode}' is applied to the cart id '${cart._id}'`
                    });
                }
            } else {
                return objectHandler({
                    code: HttpResponseType.NOT_FOUND,
                    message: `Cart not found for user id '${userId}'`
                });
            }
        } else {
            return objectHandler({
                code: HttpResponseType.NOT_FOUND,
                message: `Discount not found for discount code '${discountCode}'`
            });
        }
    }
}
