import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema;

let productSchema = ProductSchema({
	style: {
		type: String,
		unique: true,
		enum: ['Men', 'Women'],
		required: true
	},
	productName: {
		type: String,
		required: true
	},
	category: {
		type: String,
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
			'Small',
			'Medium',
			'Large',
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
