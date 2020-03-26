import { objectHandler } from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';

export default function makeCartEndPointHandler({
    cartList,
    userList,
    productList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
        case 'POST':
            return addCartProducts(httpRequest);
        case 'GET':
            return getCartProducts(httpRequest);
        case 'PUT':
            return updateCartProducts(httpRequest);
        default:
            return objectHandler({
                code: HttpResponseType.METHOD_NOT_ALLOWED,
                message: `${httpRequest.method} method not allowed`
            });
        }
    };

    async function addCartProducts(httpRequest) {
        const { userId, selected } = httpRequest.body;

        if (userId && selected) {
            try {
                const isValid = await userList.findUserById(userId);
                let totalPrice = 0;

                if (!isValid) {
                    return objectHandler({
                        code: HttpResponseType.CLIENT_ERROR,
                        message: `Invalid user id '${userId}'`
                    });
                }

                for (let i = 0; i < selected.length; i++) {
                    let { price, qty } = await productList.findProductById(selected[i].productId);

                    if (qty < selected[i].selectedQty) {
                        return objectHandler({
                            code: HttpResponseType.CLIENT_ERROR,
                            message: `Selected quantity is greater than available quantity for product id '${selected[i].productId}'`
                        });
                    }
                    totalPrice += (price * selected[i].selectedQty);
                }

                const data = {
                    userId: userId,
                    selected: selected,
                    totalPrice: totalPrice.toFixed(2),
                    products: []
                };
                const result = await cartList.addTempProducts(data);
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: result,
                    message: `Cart data saved successful for user id '${userId}'`
                });
            } catch (error) {
                return objectHandler({
                    code: HttpResponseType.INTERNAL_SERVER_ERROR,
                    message: error.code === 11000 ? `Cart is already exists for user id '${userId}'` : error.message
                });
            }
        } else {
            return objectHandler({
                code: HttpResponseType.CLIENT_ERROR,
                message: 'Request body is missing or invalid'
            });
        }
    }

    async function getCartProducts(httpRequest) {
        const { userId } = httpRequest.pathParams;

        if (userId) {
            try {
                let product = {};
                let products = [];
                let selectedQty = 0;

                const cart = await cartList.getTempProducts({ userId });

                const { selected, totalPrice } = cart || null;

                if (cart && (selected && selected.length)) {
                    for (let i = 0; i < selected.length; i++) {
                        product = await productList.findProductById(selected[i].productId);
                        selectedQty = selected[i].selectedQty;
                        Object.assign(product, { selectedQty });

                        if (product) {
                            products.push(product);
                        }
                    }
                } else {
                    return objectHandler({
                        code: HttpResponseType.NOT_FOUND,
                        message: `Cart data not available for user id '${userId}'`
                    });
                }

                const cartItems = {
                    userId,
                    selected: [],
                    products,
                    totalPrice
                };

                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: cartItems,
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

    async function updateCartProducts(httpRequest) {
        const { userId } = httpRequest.pathParams;
        const { selected } = httpRequest.body;

        if (selected && userId) {
            try {
                const isValid = await userList.findUserById(userId);
                let totalPrice = 0;

                if (!isValid) {
                    return objectHandler({
                        code: HttpResponseType.CLIENT_ERROR,
                        message: `Invalid user id '${userId}'`
                    });
                }

                for (let i = 0; i < selected.length; i++) {
                    let { price, qty } = await productList.findProductById(selected[i].productId);

                    if (qty < selected[i].selectedQty) {
                        return objectHandler({
                            code: HttpResponseType.CLIENT_ERROR,
                            message: `Selected quantity is greater than available quantity for product id '${selected[i].productId}'`
                        });
                    }
                    totalPrice += (price * selected[i].selectedQty);
                }

                const data = {
                    userId,
                    selected,
                    totalPrice: totalPrice.toFixed(2)
                };

                const result = await cartList.updateTempProducts(data);

                if (result) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: result,
                        message: `Cart data updated successful for user id '${userId}'`
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.NOT_FOUND,
                        message: `Cart not found for user id '${userId}'`
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
                message: 'Request path params or body is missing or invalid'
            });
        }
    }
}
