import { objectHandler } from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';

export default function makeCartEndPointHandler({
    cartList,
    userList,
    productList,
    metaDataList
}) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
        case 'POST':
            return addCartProducts(httpRequest);
        case 'GET':
            return getCartProducts(httpRequest);
        case 'PUT':
            return updateCartProducts(httpRequest);
        case 'DELETE':
            if (httpRequest.queryParams && httpRequest.queryParams.productId) {
                return deleteCartProduct(httpRequest);
            }
            return deleteCart(httpRequest);
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
                    let product = await productList.findProductById(selected[i].productId);
                    if (!product) {
                        return objectHandler({
                            code: HttpResponseType.NOT_FOUND,
                            message: `Selected product id '${selected[i].productId}' does not found`
                        });
                    }

                    if (product.qty < selected[i].selectedQty) {
                        return objectHandler({
                            code: HttpResponseType.CLIENT_ERROR,
                            message: `Selected quantity is greater than available quantity for product id '${selected[i].productId}'`
                        });
                    }

                    Object.assign(selected[i], product);
                    totalPrice += (product.price * selected[i].selectedQty);
                }

                const data = {
                    userId: userId,
                    selected: selected,
                    netTotalPrice: totalPrice.toFixed(2),
                    grossTotalPrice: totalPrice.toFixed(2)
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
                const cart = await cartList.getTempProducts({ userId });
                if (cart && (cart.selected && cart.selected.length)) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: cart,
                        message: ''
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.NOT_FOUND,
                        message: `Cart data not available for user id '${userId}'`
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

    async function updateCartProducts(httpRequest) {
        const { userId } = httpRequest.pathParams;
        const { selected } = httpRequest.body;

        if (userId && selected.length) {
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
                    let product = await productList.findProductById(selected[i].productId);

                    if (!product) {
                        return objectHandler({
                            code: HttpResponseType.NOT_FOUND,
                            message: `Selected product id '${selected[i].productId}' does not found`
                        });
                    }

                    if (product.qty < selected[i].selectedQty) {
                        return objectHandler({
                            code: HttpResponseType.CLIENT_ERROR,
                            message: `Selected quantity is greater than available quantity for product id '${selected[i].productId}'`
                        });
                    }

                    delete product._id;

                    Object.assign(selected[i], product);
                    totalPrice += (product.price * selected[i].selectedQty);
                }

                const prices = {};
                const { discountCode } = await cartList.getTempProducts({ userId });

                if (discountCode) {
                    const { deductiblePercentage } = await metaDataList.findByDiscountCode({ discountCode });

                    if (deductiblePercentage) {
                        const discountTotal = totalPrice * (deductiblePercentage / 100);
                        prices.discountsDeducted = discountTotal.toFixed(2);
                        prices.netTotalPrice = (totalPrice - discountTotal).toFixed(2);
                    } else {
                        return objectHandler({
                            code: HttpResponseType.NOT_FOUND,
                            message: `Applied discount code '${discountCode}' is missing or invalid`
                        });
                    }
                } else {
                    prices.netTotalPrice = totalPrice.toFixed(2);
                }
                prices.grossTotalPrice = totalPrice.toFixed(2);

                const data = {
                    discountsDeducted: prices.discountsDeducted,
                    netTotalPrice: prices.netTotalPrice,
                    grossTotalPrice: prices.grossTotalPrice,
                    selected
                };

                const result = await cartList.updateTempProducts(userId, data);
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

    async function deleteCartProduct(httpRequest) {
        const { userId } = httpRequest.pathParams;
        const { productId } = httpRequest.queryParams;

        try {
            const products = await cartList.removeCartProduct(userId, productId);

            if (products && products.selected.length) {
                let total = 0;

                products.selected.map((product) => {
                    total += (product.selectedQty * product.price);
                });

                const { discountCode } = await cartList.getTempProducts({ userId });

                if (discountCode) {
                    const { deductiblePercentage } = await metaDataList.findByDiscountCode({ discountCode });

                    if (deductiblePercentage) {
                        const discountTotal = total * (deductiblePercentage / 100);
                        products.discountsDeducted = discountTotal.toFixed(2);
                        products.netTotalPrice = total - discountTotal.toFixed(2);
                    } else {
                        return objectHandler({
                            code: HttpResponseType.NOT_FOUND,
                            message: `Applied discount code '${discountCode}' is missing or invalid`
                        });
                    }
                } else {
                    products.netTotalPrice = total.toFixed(2);
                }
                products.grossTotalPrice = total.toFixed(2);

                const updatedProducts = await cartList.updateTempProducts(userId, products);

                if (updatedProducts && updatedProducts.selected) {
                    return objectHandler({
                        status: HttpResponseType.SUCCESS,
                        data: updatedProducts,
                        message: `Cart product '${productId}' deleted successful`
                    });
                } else {
                    return objectHandler({
                        code: HttpResponseType.NOT_FOUND,
                        message: `Something went wrong while updating the product id '${productId}'`
                    });
                }
            } else {
                return deleteCart(httpRequest);
            }
        } catch (error) {
            return objectHandler({
                code: HttpResponseType.NOT_FOUND,
                message: error.message
            });
        }
    }

    async function deleteCart(httpRequest) {
        const { userId } = httpRequest.pathParams;

        try {
            let result = await cartList.removeCart(userId);

            if (result && result.deletedCount) {
                return objectHandler({
                    status: HttpResponseType.SUCCESS,
                    data: result,
                    message: `Cart is deleted for user id '${userId}' successful`
                });
            } else {
                return objectHandler({
                    code: HttpResponseType.NOT_FOUND,
                    message: `Requested cart for user id '${userId}' is not available`
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
}
