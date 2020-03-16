import Product from '../models/product';
import Category from '../models/category';

export default function makeProductList() {
    return Object.freeze({
        addProduct,
        getAllProducts,
        addCategory,
        getAllCategories,
    });

    async function getAllProducts() {
        try {
            return Product.find().then((data) => {
                return data;
            }).catch((error) => {
                console.log(error.message);
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    async function addProduct(product) {
        try {
            return new Product(product).save();
        } catch (error) {
            return error;
        }
    }

    async function getAllCategories() {
        try {
            return Category.find().then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async function addCategory(category) {
        try {
            return new Category(category).save();
        } catch (error) {
            return error;
        }
    }
}
