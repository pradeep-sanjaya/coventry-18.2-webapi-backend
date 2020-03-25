import CartItem from '../models/cart-item';

export default function makeCartList() {
    return Object.freeze({
        addTempProducts,
        getTempProducts,
        updateTempProducts,
        removeTempProducts
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

    async function updateTempProducts({ userId, selected, totalPrice }) {
        return CartItem.findOneAndUpdate(userId,
            { $set: { selected, totalPrice } }, { new: true });
    }

    async function removeTempProducts(userId) {
        try {
            return CartItem.deleteOne({ userId });
        } catch (error) {
            return error;
        }
    }
}
