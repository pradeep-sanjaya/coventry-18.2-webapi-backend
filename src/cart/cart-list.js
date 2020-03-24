import Product from '../models/product';
import CartItem from '../models/cart-item';
import User from '../models/user';
import ObjectID from 'mongoose';

export default function makeCartList() {
    return Object.freeze({
        addTempProducts,
        getTempProducts,
        updateTempProducts,
        findProductsById,
        findUserById
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
            return Product.findOne({ _id: productId }).lean(true);
        } catch (error) {
            return error;
        }
    }

    async function updateTempProducts({ userId, selected, totalPrice }) {
        return CartItem.findOneAndUpdate(userId,
            { $set: { selected, totalPrice } }, { new: true });
    }

    async function findUserById(userId) {
        try {
            const isValid = ObjectID.isValidObjectId(userId);
            if (isValid) {
                return User.findOne({ _id: { $eq: userId } });
            }
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
}
