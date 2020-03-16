import User from '../models/user';

export default function makeUserList() {
    return Object.freeze({
        add,
        findByUsername,
        remove,
        replace,
        update
    });

    async function add(user) {
        let userObj = new User(user);
        return userObj.save();
    }

    async function findByUsername({
        username
    }) {
        return User.findOne({
            username
        });
    }

    async function remove({}) {

    }

    // todo:
    async function replace() {
    }

    // todo:
    async function update() {
    }
}
