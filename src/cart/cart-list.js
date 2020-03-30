import CartItem from '../models/cart-item';

export default function makeCartList() {
    return Object.freeze({
        addTempProducts,
        getTempProducts,
        updateTempProducts,
        removeCartProduct,
        removeCart
    });

    async function addTempProducts(data) {
        try {
            return new CartItem(data).save();
        } catch (error) {
            return error;
        }
    }

    async function getTempProducts(userId) {
        try {
            return CartItem.findOne(userId);
        } catch (error) {
            return error;
        }
    }

    async function updateTempProducts(id, data) {
        return CartItem.findOneAndUpdate({ userId: id }, data, { new: true });
    }

    async function removeCartProduct(userId, productId) {
        try {
            return CartItem.findOneAndUpdate(
                { userId: userId },
                { $pull: { selected: { productId } } },
                { new: true }, (error, data) => {
                    return error ? error : data;
                });
        } catch (error) {
            return error;
        }
    }

    async function removeCart(id) {
        try {
            return CartItem.deleteOne({ userId: id }).then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }
}
