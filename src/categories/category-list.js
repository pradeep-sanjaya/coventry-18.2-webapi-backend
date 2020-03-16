import Category from '../models/category';

export default function makeProductList() {
    return Object.freeze({
        add,
        findCategoryById,
        getCategories,
        remove,
        replace,
        update
    });
}

async function remove({id}) {
    try {
        return Category.remove({_id:id}).then(function (success) {
            if(success){
                return {
                    success:true,
                    message:'Category deleted successfully'
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

async function add({
    category
}) {
    let cat = new Category(category);
    return cat.save();
}

async function getCategories() {
    try {
        return Category.find({}).then(function (storedDataArray) {
            return storedDataArray;
        }).catch(function (err) {
            if (err) {
                return err.message;
            }
        });
    } catch (e) {
        return e.message;
    }
}
async function findCategoryById({
    id
}) {
    try {
        return Category.find({
            _id: id
        }).then(function (category) {
            return category;
        }).catch(function (err) {
            if (err) {
                return {
                    success: false,
                    message: 'Invalid Category ID'
                };
            }
        });
    } catch (e) {
        return {
            success: false,
            message: 'Invalid Category ID'
        };
    }
}