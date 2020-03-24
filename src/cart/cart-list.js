import Product from '../models/product';
import CartItem from '../models/cart-item';

export default function makeCartList() {
    return Object.freeze({
        addTempProducts,
        getTempProducts,
        updateTempProducts,
        findProductsById
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

    async function findProductsById(productId) {
        try {
            return Product.findOne({ _id: productId }).lean();
        } catch (error) {
            return error;
        }
    }

    async function updateTempProducts({userId, selected}) {
        return CartItem.findOneAndUpdate(userId,
            { $set: { selected } },
            { new: true });
    }
}
