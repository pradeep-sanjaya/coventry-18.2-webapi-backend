"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeProductList;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductSchema = _mongoose.default.Schema({
  name: {
    type: String,
    unique: true
  },
  price: Number,
  quantity: Number,
  size: Array
});

var Product = _mongoose.default.model('Product', ProductSchema, 'productstore');

function makeProductList({
  database
}) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    replace,
    update
  });

  async function getItems({
    max = 100,
    before,
    after
  } = {}) {}

  async function add({
    product
  }) {
    var pro = new Product(product);
    return pro.save();
  }

  async function findById({}) {}

  async function remove({}) {} // todo:


  async function replace() {} // todo:


  async function update() {}
}
//# sourceMappingURL=product-list.js.map