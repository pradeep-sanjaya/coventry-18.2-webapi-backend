import Product from '../models/product';
import Category from '../models/category';

export default function makeProductList() {
    return Object.freeze({
        addProduct,
        getAllProducts,
        getProductsByCategory,
        getProductsByCategoryId,
        findProductById,
        removeProduct,
        updateProduct
    });

    async function getAllProducts(limit = null) {
        if (limit) {
            try {
                return Product.find().limit(limit).then((data) => {
                    return data;
                }).catch((error) => {
                    return error;
                });
            } catch (error) {
                return error;
            }
        } else {
            try {
                return Product.find().then((data) => {
                    return data;
                }).catch((error) => {
                    return error;
                });
            } catch (error) {
                return error;
            }
        }
    }

    async function addProduct(product) {
        try {
            return new Product(product).save();
        } catch (error) {
            return error;
        }
    }

    async function getProductsByCategory(category) {
        try {
            return Product.find({
                category: category
            }).then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async function getProductsByCategoryId(categoryId) {
        try {

            return Category.findOne({
                _id: categoryId
            }).lean(true).then((category) => {
                return Product.find({
                    category: category.name
                }).lean(true).then((product) => {
                    return product;
                }).catch((error) => {
                    return error;
                });
            }).catch((error) => {
                return error;
            });

        } catch (error) {
            return error;
        }
    }

    async function findProductById(id) {
        try {
            return Product.findOne({
                _id: id
            }).lean(true).then((product) => {
                return product;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async function removeProduct(id) {
        try {
            return Product.deleteOne({ _id: id }).then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async function updateProduct({ id, data }) {
        try {
            return Product.findByIdAndUpdate(id, data, { new: true }).then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }
}
