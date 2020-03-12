import mongoose from 'mongoose';
var ProductSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true

  },

  price: Number,
  quantity: Number,
  size: Array
});
var Product = mongoose.model('Product', ProductSchema, 'productstore');
export default function makeProductList({
  database
}) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    replace,
    update
  })

  async function getItems({
    max = 100,
    before,
    after
  } = {}) {

  }

  async function add({
    product
  }) {

    var pro = new Product(product);
    return pro.save();

  }

  async function findById({

  }) {

  }

  async function remove({

  }) {

  }

  // todo:
  async function replace() {}

  // todo:
  async function update() {}

}