import mongoose from 'mongoose';

const UserSchema = mongoose.Schema;

let userSchema = UserSchema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	contactNumber: {
		type: String,
		required: true,
		unique: true,
		minlength: 10,
		maxlength: 10
	},
	gender: {
		type: String,
		required: true,
		enum: ['Male', 'Female']
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	questionId: {
		type: Number,
		required: true
	},
	answer: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	role: {
		type: String,
		required: true,
		enum: ['Admin', 'Customer']
	}
});

let User = mongoose.model('User', userSchema, 'users');

module.exports = User;
