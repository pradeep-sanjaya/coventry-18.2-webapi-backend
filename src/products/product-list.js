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

var CategorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});
var Product = mongoose.model('Product', ProductSchema, 'products');

var Category = mongoose.model('Category', CategorySchema, 'categories');

export default function makeProductList({
  database
}) {
  return Object.freeze({
    add,
    findById,
    getProducts,
    remove,
    replace,
    update,
    addCategory,
    getCategories,
  });

  async function getProducts({
    max = 100,
    before,
    after
  } = {}) {
    try{
      return Product.find({}).then(function (storedDataArray) {
        return storedDataArray;
      }).catch(function(err){
        if (err) {
          throw new Error(err.message);
        }
      });
    }catch (e) {
      console.log(e)
    }

  }
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

  async function addCategory({category}){
    var cat = new Category(category);
    return cat.save();
  }
  async function getCategories(){
    try{
      return Category.find({}).then(function (storedDataArray) {
        return storedDataArray;
      }).catch(function(err){
        if (err) {
          throw new Error(err.message);
        }
      });
    }catch (e) {
      console.log(e)
    }
}
