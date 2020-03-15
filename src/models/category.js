import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema;

let categorySchema = CategorySchema({
	category: {
		type: String,
		unique: true,
		enum: [
			'Shirts',
			'T-Shirts',
			'Trunks',
			'Trousers',
			'Jeans',
			'Shorts',
			'Skirts',
			'Tops'],
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	}
});

const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;
