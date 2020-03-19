import Discount from '../models/discount';
import ObjectID from 'mongoose';

export default function makeMetaDataList() {
    return Object.freeze({
        addDiscountCode,
        getAllDiscounts,
        findByDiscountId,
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

    async function findByDiscountId(id) {
        try {
            const isValid = ObjectID.isValidObjectId(id);
            if (isValid) {
                return Discount.findOne({ _id: id }).then((data) => {
                    return data;
                }).catch((error) => {
                    return error;
                });
            }
        } catch (error) {
            return error;
        }
    }

    async function updateDiscount(id, data) {
        try {
            const isValid = ObjectID.isValidObjectId(id);
            if (isValid) {
                return Discount.findOneAndUpdate(
                    id,
                    {
                        $set: {
                            discountCode: data.discountCode,
                            deductiblePercentage: data.deductiblePercentage
                        }
                    }).then((data) => {
                    return data;
                }).catch((error) => {
                    return error;
                });
            }
        } catch (error) {
            return error;
        }
    }

    async function removeDiscount(id) {
        try {
            const isValid = ObjectID.isValidObjectId(id);
            if (isValid) {
                return Discount.deleteOne({ _id: id }).then((data) => {
                    return data;
                }).catch((error) => {
                    return error;
                });
            }
        } catch (error) {
            return error;
        }
    }
}
