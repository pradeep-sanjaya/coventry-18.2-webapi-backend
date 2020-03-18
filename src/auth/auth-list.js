import User from '../models/user';

export default function makeAuthList() {
    return Object.freeze({
        addUser,
        findByEmail
    });

    async function addUser(user) {
        try {
            return new User(user).save();
        } catch (error) {
            return error;
        }
    }

    async function findByEmail(email) {
        try {
            return User.findOne(email);
        } catch (error) {
            return error;
        }
    }
}
