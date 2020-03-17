import User from '../models/user';

export default function makeAuthList() {
    return Object.freeze({
        addUser,
        findByUsername
    });

    async function addUser(user) {
        try {
            return new User(user).save();
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    async function findByUsername(username) {
        try {
            return User.findOne(username);
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
}
