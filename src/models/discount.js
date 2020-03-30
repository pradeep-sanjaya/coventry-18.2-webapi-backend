import mongoose from 'mongoose';

const DiscountSchema = mongoose.Schema;

let discountSchema = DiscountSchema({
    timestamp: {
        type: Number,
        default: new Date().getTime()
    },
    discountCode: {
        type: String,
        unique: true
    },
    deductiblePercentage: {
        type: Number,
        required: true
    }
});

const SecretQuestion = mongoose.model('Discount', discountSchema, 'discount-codes');

module.exports = SecretQuestion;
