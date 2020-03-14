import mongoose from 'mongoose';
let UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email:{
    type: String,
    required:true,
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

let User = mongoose.model('User', UserSchema, 'users');
export default function makeUserList({
  database
}) {
  return Object.freeze({
    add,
    findByUsername,
    remove,
    replace,
    update
  });
  async function add({
    user
  }) {
    let userObj = new User(user);
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
