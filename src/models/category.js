import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema;

let categorySchema = CategorySchema({
    timestamp: {
        type: Number,
        default: new Date().getTime()
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
