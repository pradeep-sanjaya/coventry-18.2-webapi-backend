import mongoose from 'mongoose';

const DiscountSchema = mongoose.Schema;

let discountSchema = DiscountSchema({
    discountCode: {
        type: String,
        required: true,
        unique: true
    },
    deductiblePercentage: {
        type: Number,
        required: true
    }
});

const SecretQuestion = mongoose.model('Discount', discountSchema, 'discount-codes');

module.exports = SecretQuestion;
