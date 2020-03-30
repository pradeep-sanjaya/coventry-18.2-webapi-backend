import mongoose from 'mongoose';

const CartItemSchema = mongoose.Schema;

let cartItemSchema = CartItemSchema({
    timestamp: {
        type: Number,
        default: new Date().getTime()
    },
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
            }
        }
    ],
    discountCode: {
        type: String,
        default: null
    },
    discountsDeducted: {
        type: Number,
        default: 0
    },
    grossTotalPrice: {
        type: Number,
        default: 0
    },
    netTotalPrice: {
        type: Number,
        default: 0
    }
});

const CartItem = mongoose.model('CartItem', cartItemSchema, 'cart-items');

module.exports = CartItem;
