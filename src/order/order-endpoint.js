import { objectHandler } from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';

export default function makeOrderEndPointHandler({
    orderList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
        case 'POST':
            return addOrderDetails(httpRequest);
        case 'GET':
            return getOrderDetails(httpRequest);
        default:
            return objectHandler({
                code: HttpResponseType.METHOD_NOT_ALLOWED,
                message: `${httpRequest.method} method not allowed`
            });
        }
    };

    async function addOrderDetails(httpRequest) {
        const { userId, paymentType, deliveryAddress, prices, products } = httpRequest.body;

        if (httpRequest.body) {
            try {
                let object = {};
                for (let i = 0; i < products.length; i++) {
                    object = {
                        id: products[i].productId,
                        selectedQty: products[i].selectedQty
                    };
                    await updateProductQuantities(object);
                }

                const userStatus = await removeUserCart(userId);

                if (!userStatus && !userStatus.deleteCount) {
                    return;
                }

                const order = {
                    userId,
                    paymentType,
                    deliveryAddress,
                    prices,
                    products
                };

                const result = await orderList.addOrderProducts(order);
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: result,
                    message: 'Order created successful'
                });
            } catch (error) {
                return objectHandler({
                    code: HttpResponseType.INTERNAL_SERVER_ERROR,
                    message: error.message
                });
            }
        } else {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: 'Request body does not contain a body'
            });
        }
    }

    //TODO: to be implemented
    async function getOrderDetails(httpRequest) {}

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
            return await orderList.removeTempProducts(userId);
        } catch (error) {
            return error;
        }
    }
}
