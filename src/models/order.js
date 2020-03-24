import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema;

let orderSchema = OrderSchema({
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
    prices: {
        discountCode: {
            type: String,
            required: true
        },
        discountsDeducted: {
            type: Number,
            required: true
        },
        grossTotalPrice: {
            type: Number,
            required: true
        },
        netTotalPrice: {
            type: Number,
            required: true
        }
    },
    products: [
        {
            _id: false,
            productId: {
                type: String,
                required: true
            },
            selectedQty: {
                type: Number,
                required: true
            }
        }
    ]
});

const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
