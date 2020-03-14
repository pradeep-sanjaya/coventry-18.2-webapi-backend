"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUserList;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = _mongoose.default.Schema({
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

var User = _mongoose.default.model('User', UserSchema, 'users');

function makeUserList({
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
    var userObj = new User(user);
    return userObj.save();
  }

  async function findByUsername({
    username
  }) {
    return User.findOne({
      username
    });
  }

  async function remove({}) {} // todo:


  async function replace() {} // todo:


  async function update() {}
}
//# sourceMappingURL=users-list.js.map