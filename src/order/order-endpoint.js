import {objectHandler} from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';

export default function makeOrderEndPointHandler({
    orderList,
    cartList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
        case 'POST':
            return addOrderDetails(httpRequest);
        case 'GET':
            if (httpRequest.queryParams.orderId) {
                return getOrderDetails(httpRequest);
            }
            return getAllOrderDetails(httpRequest);
        default:
            return objectHandler({
                code: HttpResponseType.METHOD_NOT_ALLOWED,
                message: `${httpRequest.method} method not allowed`
            });
        }
    };

    async function addOrderDetails(httpRequest) {
        const { userId, paymentType, deliveryAddress } = httpRequest.body;

        let cart = await cartList.getTempProducts({ userId });

        if (cart) {
            const {
                selected,
                netTotalPrice,
                discountCode,
                discountsDeducted,
                grossTotalPrice
            } = cart;

            if (httpRequest.body) {
                try {
                    for (let i = 0; i < selected.length; i++) {
                        let object = {
                            id: selected[i].productId,
                            selectedQty: selected[i].selectedQty
                        };

                        const updatedProducts = await updateProductQuantities(object);

                        if (updatedProducts) {
                            Object.assign(selected[i], updatedProducts);
                        }
                    }

                    const userStatus = await removeUserCart(userId);

                    if (!userStatus && !userStatus.deleteCount) {
                        return;
                    }

                    const order = {
                        userId,
                        paymentType,
                        deliveryAddress,
                        discountCode,
                        discountsDeducted,
                        grossTotalPrice,
                        netTotalPrice,
                        selected
                    };

                    const result = await orderList.addOrderProducts(order);

                    if (result) {
                        return objectHandler({
                            status: HttpResponseType.SUCCESS,
                            data: result,
                            message: 'Order created successful'
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
                    message: 'Request body does not contain required fields'
                });
            }
        } else {
            return objectHandler({
                code: HttpResponseType.NOT_FOUND,
                message: `Cart not found for user id'${userId}'`
            });
        }
    }

    async function getAllOrderDetails(httpRequest) {
        const { userId } = httpRequest.pathParams;
        try {
            if (userId) {
                const result = await orderList.findAllOrdersByUserId(userId);
                if (result) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: result,
                        message: ''
                    });
                }
            } else {
                return objectHandler({
                    code: HttpResponseType.CLIENT_ERROR,
                    message: 'Request body does not contain required field'
                });
            }
        } catch (error) {
            return objectHandler({
                code: HttpResponseType.INTERNAL_SERVER_ERROR,
                message: error.message
            });
        }
    }

    async function getOrderDetails(httpRequest) {
        const { orderId } = httpRequest.queryParams;

        if (orderId) {
            const result = await orderList.findOneByOrderId(orderId);

            if (result) {
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: result,
                    message: ''
                });
            } else {
                return objectHandler({
                    code: HttpResponseType.CLIENT_ERROR,
                    message: `Order details not found for order Id '${orderId}'`
                });
            }
        } else {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: 'Request path params does not contain required field'
            });
        }
    }

    async function updateProductQuantities(data) {
        try {
            const { id, selectedQty } = data;
            return await orderList.updateProductQuantities({ id, selectedQty });
        } catch (error) {
            return error;
        }
    }

    async function removeUserCart(userId) {
        try {
            return await cartList.removeCart(userId);
        } catch (error) {
            return error;
        }
    }
}
