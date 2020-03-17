import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema;

let productSchema = ProductSchema({
    style: {
        type: String,
        enum: ['Men', 'Women', 'Unisex'],
        required: true
    },
    productName: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availableQty: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    availableSizes: {
        type: [String],
        enum: [
            'S',
            'M',
            'L',
            'XL',
            'XXL'],
        required: true
    },
    availableColors: {
        type: [String],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
