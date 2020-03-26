import mongoose from 'mongoose';

const UserSchema = mongoose.Schema;

let userSchema = UserSchema({
    timestamp: {
        type: Number,
        default: new Date().getTime()
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
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
    },
    resetToken: {
        type: String,
        default: null
    }
});

let User = mongoose.model('User', userSchema, 'users');

module.exports = User;
