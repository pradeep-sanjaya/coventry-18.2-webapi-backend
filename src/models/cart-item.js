import mongoose from 'mongoose';

const CartItemSchema = mongoose.Schema;

let cartItemSchema = CartItemSchema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    selected: [
        {
            _id: false,
            productId: {
                type: String,
                required: true,
                unique: true
            },
            selectedQty: {
                type: Number,
                required: true
            }
        }
    ],
    products: [
        {
            _id: false,
            productId: {
                type: String,
                required: true,
                unique: true
            },
            name: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            selectedQty: {
                type: Number,
                required: true
            },
            isAvailable: {
                type: Boolean,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            },
            default: []
        }
    ],
    totalPrice: {
        type: Number,
        default: null
    }
});

const CartItem = mongoose.model('CartItem', cartItemSchema, 'cart-items');

module.exports = CartItem;
