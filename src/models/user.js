import mongoose from 'mongoose';

const UserSchema = mongoose.Schema;

let userSchema = UserSchema({
	userId: {
		type: UserSchema.Types.ObjectId,
		unique: true,
		auto: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minLength: 8
	},
	role: {
		type: String,
		required: true,
		enum: ["Admin", "Customer"]
	}
});

let User = mongoose.model('User', userSchema, 'users');

module.exports = User;
