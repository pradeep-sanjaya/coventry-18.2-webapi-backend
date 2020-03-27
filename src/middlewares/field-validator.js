import { body, validationResult } from 'express-validator';
import { errorResponse } from '../helpers/response/response-dispatcher';
import HttpResponseType from '../models/http-response-type';

function fieldStateChecker(req, res, next) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(error => extractedErrors.push(error.msg));

    return errorResponse(res, {
        code: HttpResponseType.UNPROCESSABLE_ENTITY,
        message: extractedErrors.join(', ')
    });
}

const validate = (main, route, method) => {
    switch (main) {
        case 'auth':
            return authValidator(route, method);
        case 'categories':
            return categoriesValidator(route);
        case 'products':
            return productsValidator(route);
        case 'cart':
            return cartValidator(route, method);
        case 'orders':
            return orderValidator(route);
        case 'meta-data':
            return metaDataValidator(route, method);
        default:
            return [];
    }
};

function authValidator(route, method) {
    switch (route) {
        case '/login':
            return [
                body('email')
                    .exists().withMessage('Email is not valid')
                    .isEmail().withMessage('Email is in invalid format'),
                body('password')
                    .exists().withMessage('Password is required')
                    .isLength({ min: 8 }).withMessage('Password should be 8 characters long')
                    .matches(/\d/).withMessage('Password must contain a number')
            ];
        case '/register':
            return [
                body('gender')
                    .exists().withMessage('Gender is required')
                    .isString().withMessage('Gender should be String'),
                body('firstName')
                    .exists().withMessage('First name is required')
                    .isString().withMessage('First name should be String'),
                body('lastName')
                    .exists().withMessage('Last name is required')
                    .isString().withMessage('Last name should be String'),
                body('email')
                    .exists().withMessage('Email is not valid')
                    .isEmail().withMessage('Email is in invalid format'),
                body('password')
                    .exists().withMessage('Password is required')
                    .isLength({ min: 8 }).withMessage('Password should be 8 characters long')
                    .matches(/\d/).withMessage('Password must contain a number'),
                body('role').exists().withMessage('Role is required')
                    .isString().withMessage('Role should be String')
            ];
        case '/reset-password':
            switch (method) {
                case 'POST':
                    return [
                        body('email')
                            .exists().withMessage('Email is not valid')
                            .isEmail().withMessage('Email is in invalid format')
                    ];
                case 'PUT':
                    return [
                        body('password')
                            .exists().withMessage('Password is required')
                            .isLength({ min: 8 }).withMessage('Password should be 8 characters long')
                            .matches(/\d/).withMessage('Password must contain a number')
                    ];
                default:
                    return [];
            }
        default:
            return [];
    }
}

function categoriesValidator(route) {
    if (route === '/') {
        return [
            body('name')
                .exists().withMessage('Name is required')
                .isString().withMessage('Name should be String'),
            body('imageUrl')
                .exists().withMessage('Image url is required')
            //.isURL().withMessage('Image url is invalid type of Url')
        ];
    } else {
        return [];
    }
}

function productsValidator(route) {
    if (route === '/') {
        return [
            body('name')
                .exists().withMessage('Name is required')
                .isString().withMessage('Name should be String'),
            body('category')
                .exists().withMessage('Category is required')
                .isString().withMessage('Category should be String'),
            body('qty')
                .exists().withMessage('Name is required')
                .isNumeric().withMessage('Name should be Number'),
            body('isAvailable')
                .exists().withMessage('Is Available is required')
                .isBoolean().withMessage('Name should be Boolean'),
            body('price')
                .exists().withMessage('Price is required')
                .isNumeric().withMessage('Price should be Number'),
            body('imageUrl')
                .exists().withMessage('Image url is required')
                .isURL().withMessage('Image url is Invalid type of Url')
        ];
    } else {
        return [];
    }
}

//todo: validators not triggers properly
function cartValidator(route, method) {
    if (route === '/products') {
        switch (method) {
            case 'POST':
                return [
                    body('userId')
                        .exists().withMessage('User Id is required')
                        .isMongoId().withMessage('User id is invalid mongo id'),
                    body('selected', 'Selected is required').exists()
                        .isArray().withMessage('Selected should be Array'),
                    body('selected.*.productId')
                        .exists().withMessage('Product id is required')
                        .isMongoId().withMessage('Product id is invalid mongo id'),
                    body('selected.*.selectedQty')
                        .exists().withMessage('Selected qty is required')
                        .isNumeric().withMessage('Selected qty should be Number')
                ];
            case 'PUT':
                return [
                    body('selected', 'Selected is required').exists()
                        .isArray().withMessage('Selected should be Array'),
                    body('selected.*.productId')
                        .exists().withMessage('Product id is required')
                        .isMongoId().withMessage('Product id is invalid mongo id'),
                    body('selected.*.selectedQty')
                        .exists().withMessage('Selected qty is required')
                        .isNumeric().withMessage('Selected qty should be Number')
                ];
            default:
                return [];
        }
    }
}

function orderValidator(route) {
    if (route === '/') {
        return [
            body('userId')
                .exists().withMessage('User Id is required')
                .isMongoId().withMessage('User id is invalid mongo id'),
            body('paymentType')
                .exists().withMessage('Payment Type is required')
                .isString().withMessage('Payment type should be String'),
            body('deliveryAddress', 'Delivery address is required').exists(),
            body('deliveryAddress.street')
                .exists().withMessage('Street is required')
                .isString().withMessage('Street should be String'),
            body('deliveryAddress.district')
                .exists().withMessage('District is required')
                .isString().withMessage('District should be String'),
            body('deliveryAddress.zipCode')
                .exists().withMessage('Zip code is required')
                .isPostalCode('any').withMessage('Postal code should be type of Postal code'),
            body('products', 'Products is required').exists()
                .isArray().withMessage('Products should be array'),
            body('products.*.productId')
                .exists().withMessage('Product id is required')
                .isMongoId().withMessage('Product id is invalid mongo id'),
            body('products.*.selectedQty')
                .exists().withMessage('Selected qty is required')
                .isNumeric().withMessage('Selected qty should be Number')
        ];
    }
}

function metaDataValidator(route, method) {
    if (route === '/discount-codes') {
        switch (method) {
            case 'POST':
                return [
                    body('discountCode').exists().withMessage('Discount code is required')
                        .isString().withMessage('Discount code should be String'),
                    body('deductiblePercentage')
                        .exists().withMessage('Deductible percentage is required')
                        .isNumeric().withMessage('Deductible percentage should be Number')
                        .isLength({ min: 0.00, max: 1.00 }).withMessage('Deductible percentage should be between 0.00 and 1.00')
                ];
            case 'PUT':
                return [
                    body('discountCode').exists().withMessage('Discount code is required')
                        .isString().withMessage('Discount code should be String'),
                    body('deductiblePercentage')
                        .exists().withMessage('Deductible percentage is required')
                        .isNumeric().withMessage('Deductible percentage should be Number')
                        .isLength({ min: 0.00, max: 1.00 })
                ];
        }
    }
}

module.exports = { validate, fieldStateChecker };
