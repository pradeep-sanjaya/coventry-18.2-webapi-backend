import CartItem from '../models/cart-item';

export default function makeCartList() {
    return Object.freeze({
        addTempProducts,
        getTempProducts,
        updateTempProducts,
        removeTempProducts,
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

    async function removeTempProducts(userId) {
        try {
            return CartItem.deleteOne({ userId });
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
