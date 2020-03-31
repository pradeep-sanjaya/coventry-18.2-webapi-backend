import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema;

let orderSchema = OrderSchema({
    timestamp: {
        type: Number,
        default: new Date().getTime()
    },
    userId: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true,
        enum: ['Cash on Delivery']
    },
    deliveryAddress: {
        street: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        zipCode: {
            type: Number,
            required: true,
            maxlength: 5,
            minlength: 5
        }
    },
    netTotalPrice: {
        type: Number,
        required: true
    },
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
    selected: [
        {
            _id: false,
            productId: {
                type: String,
                required: true
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
    ]
});

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
