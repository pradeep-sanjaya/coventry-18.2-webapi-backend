import Product from '../models/product';

export default function makeProductList() {
    return Object.freeze({
        addProduct,
        getAllProducts,
        findProductById,
        removeProduct,
        replaceProduct,
        updateProduct
    });

    async function getAllProducts() {
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

    async function addProduct(product) {
        try {
            return new Product(product).save();
        } catch (error) {
            return error;
        }
    }

    async function findProductById({
        id
    }) {
        try {
            return Product.find({
                _id: id
            }).then((product) => {
                return product;
            }).catch((error) => {
            	return error;
            });
        } catch (error) {
            return error;
        }
    }

    async function remove({ id }) {
        try {
            return Product.remove({ _id: id }).then((success) => {
                if (success) {
                    return {
                        success: true,
                        message: 'Product deleted successfully'
                    };
                }
            }).catch((err) => {
                if (error) {
                    return error;
                }
            });
        } catch (error) {
            return error;
        }
    }

    // todo:
    async function replace() {
    }

    // todo:
    async function update() {
    }
}
