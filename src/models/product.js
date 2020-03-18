import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema;

let productSchema = ProductSchema({
    name: {
        type: String,
        unique: true,
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
    isAvailable: {
        type: Boolean,
        default: true,
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
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
