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

    async function findProductById(id) {
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

    // todo:
    async function replaceProduct() {
    }

    // todo:
    async function updateProduct({id,body}) {

        return Product.findByIdAndUpdate(id,body,{new: true});

    }
}
