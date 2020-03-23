import { objectHandler } from '../helpers/utilities/normalize-request';
import HttpResponseType from '../models/http-response-type';

export default function makeCartEndPointHandler({
    cartList
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

        if (httpRequest.body) {
            try {
                const data = {
                    userId: userId,
                    selected: selected,
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
                    message: error.message
                });
            }
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
                const { selected } = cart;

                if (selected.length) {
                    for (let i = 0; i < selected.length; i++) {
                        product = await cartList.findProductsById(selected[i].productId);
                        selectedQty = selected[i].selectedQty;
                        //TODO: value assigned but response not contains selected quantity
                        Object.assign(product, { selectedQty: selectedQty });

                        if (product) {
                            products.push(product);
                        }
                    }
                }

                const totalPrice = products.reduce((acc, product) => {
                    return acc + (product.price * product.selectedQty);
                }, 0);

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

    //TODO: Cart update event
    async function updateCartProducts(httpRequest) {}
}
