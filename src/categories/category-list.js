import Category from '../models/category';

export default function makeCategoryList() {
    return Object.freeze({
        addCategory,
        findCategoryById,
        getAllCategories,
        removeCategory,
        updateCategory
    });

    async function removeCategory(id) {
        try {
            return Category.deleteOne({ _id: id }).then((data) => {
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

    async function findCategoryById(id) {
        try {
            return Category.find({
                _id: id
            }).then((category) => {
                return category;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }

    async function updateCategory({ id, body }) {
        try {
            return Category.findByIdAndUpdate(id, body, { new: true }).then((data) => {
                return data;
            }).catch((error) => {
                return error;
            });
        } catch (error) {
            return error;
        }
    }
}
