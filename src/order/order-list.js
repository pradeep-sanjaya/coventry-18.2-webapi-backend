import Product from '../models/product';
import Order from '../models/order';

export default function makeCartList() {
    return Object.freeze({
        addOrderProducts,
        findOneByOrderId,
        findAllOrdersByUserId,
        updateProductQuantities
    });

    async function addOrderProducts(data) {
        try {
            return new Order(data).save();
        } catch (error) {
            return error;
        }
    }

    async function findAllOrdersByUserId(userId) {
        try {
            return Order.find({ userId }).then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    //TODO: Deprecated and to be removed
    async function findOneByOrderId(id) {
        try {
            return Order.findOne({ _id: id });
        } catch (error) {
            return error;
        }
    }

    async function updateProductQuantities({ id, selectedQty }) {
        try {
            let product = null;
            let qty = 0;

            await Product.findOne({ _id: id }, (err, productObj) => {
                product = productObj;
            });

            if (product) {
                qty = product.qty - selectedQty;
            }

            if (qty === 0) {
                return Product.findOneAndUpdate({ _id: id },
                    { qty, isAvailable: false },
                    { new: true }).lean(true);
            }

            if (qty > 0) {
                return Product.findOneAndUpdate({ _id: id },
                    { qty },
                    { new: true }).lean(true);
            }
        } catch (error) {
            return error;
        }
    }
}
