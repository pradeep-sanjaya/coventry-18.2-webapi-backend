import mongoose from 'mongoose';
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});
var User = mongoose.model('User', UserSchema, 'users');
export default function makeUserList({
  database
}) {
  return Object.freeze({
    add,
    findByUsername,
    remove,
    replace,
    update
  })
  async function add({
    user
  }) {
    var userObj = new User(user);
    return userObj.save();
  }

  async function findByUsername({
    username
  }) {
    return User.findOne({
      username
    })
  }

  async function remove({}) {

  }

  // todo:
  async function replace() {}

  // todo:
  async function update() {}

}