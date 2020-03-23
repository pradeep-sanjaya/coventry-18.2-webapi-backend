import Product from '../models/product';
import Order from '../models/order';
import CartItem from '../models/cart-item';

export default function makeCartList() {
    return Object.freeze({
        addOrderProducts,
        updateProductQuantities,
        removeTempProducts
    });

    async function addOrderProducts(data) {
        try {
            return new Order(data).save();
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
                return Product.findOneAndUpdate(id,
                    { $set: { qty, isAvailable: false } },
                    { new: true });
            }

            if (qty > 0) {
                return Product.findOneAndUpdate(id,
                    { $set: { qty } },
                    { new: true });
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async function removeTempProducts(userId) {
        try {
            return CartItem.deleteOne({ userId });
        } catch (error) {
            return error;
        }
    }
}
