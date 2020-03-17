import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema;

let categorySchema = CategorySchema({
    category: {
        type: String,
        unique: true,
        required: true
    },
    style: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Unisex']
    },
	imageUrl: {
		type: String,
		required: true
	},
    status: {
        type: Boolean,
        default: true
    }
});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
