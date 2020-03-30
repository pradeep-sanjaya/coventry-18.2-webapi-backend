import Discount from '../models/discount';

export default function makeMetaDataList() {
    return Object.freeze({
        addDiscountCode,
        getAllDiscounts,
        findByDiscountCode,
        updateDiscount,
        removeDiscount
    });

    async function addDiscountCode(data) {
        try {
            return new Discount(data).save();
        } catch (error) {
            return error;
        }
    }

    async function getAllDiscounts() {
        try {
            return Discount.find().then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async function findByDiscountCode(discountCode) {
        try {
            return Discount.findOne(discountCode).then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async function updateDiscount(discountCode, data) {
        try {
            return Discount.findOneAndUpdate(
                { discountCode }, data, { new: true }).then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async function removeDiscount(discountCode) {
        try {
            return Discount.deleteOne({ discountCode }).then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }
}
