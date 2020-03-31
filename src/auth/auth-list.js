import User from '../models/user';
import hasher from '../helpers/hasher';

export default function makeAuthList() {
    return Object.freeze({
        addUser,
        findByEmail,
        findUserById,
        resetPassword,
        updateResetToken
    });

    async function addUser(user) {
        try {
            return new User(user).save();
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    async function findByEmail(email) {
        try {
            return User.findOne(email);
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    async function findUserById(userId) {
        try {
            return User.findOne({ _id: { $eq: userId } });
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    async function updateResetToken(resetObj) {
        try {
            return User.findOneAndUpdate(resetObj.email,
                { $set: { resetToken: resetObj.resetToken } },
                { new: true });
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    async function resetPassword(resetObj) {
        try {
            const hashed = hasher({
                password: resetObj.password,
            });
            let user = null;
            await User.findOne({ resetToken: resetObj.resetToken }, (err, userObj) => {
                user = userObj;
            });

            if (user) {
                return User.findOneAndUpdate(
                    resetObj.resetToken,
                    { $set: { password: hashed, resetToken: null } },
                    { new: true });
            }
            return false;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
}
