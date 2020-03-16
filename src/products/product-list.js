import Product from '../models/product';

export default function makeProductList() {
    return Object.freeze({
        add,
        findProductById,
        getProducts,
        remove,
        replace,
        update
    });

    async function getProducts({
        max = 100,
        before,
        after
    } = {}) {
        try {
            return Product.find({}).then(function (storedDataArray) {
                return storedDataArray;
            }).catch(function (err) {
                if (err) {
                    throw new Error(err.message);
                }
            });
        } catch (e) {
            console.log(e);
        }

    }
}

async function add({
    product
}) {
    let pro = new Product(product);
    return pro.save();
}

async function findProductById({
    id
}) {
    try {
        return Product.find({
            _id: id
        }).then(function (product) {
            return product;
        }).catch(function (err) {
            if (err) {
                return {
                    success: false,
                    message: 'Invalid Product ID'
                };
            }
        });
    } catch (e) {
        return {
            success: false,
            message: 'Invalid Product ID'
        };
    }
}

async function remove({id}) {
    try {
        return Product.remove({_id:id}).then(function (success) {
            if(success){
                return {
                    success:true,
                    message:'Product deleted successfully'
                };
            }
        }).catch(function (err) {
            if (err) {
                return err.message;
            }
        });
    } catch (e) {
        return e.message;
    }
}

// todo:
async function replace() {}

// todo:
async function update() {}
