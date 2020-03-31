import express from 'express';
import productController from '../products/product-controller';
import filterRoute from '../middlewares/route-filter';
import { fieldStateChecker, validate } from '../middlewares/field-validator';

let productRouter = express.Router();

productRouter.get('/',
    filterRoute,
    (req, res) => {
        productController(req, res);
    });

/* GET product by id. */
productRouter.get('/:id',
    filterRoute,
    validate('products', '/', 'GET'),
    fieldStateChecker,
    (req, res) => {
        productController(req, res);
    });

/* POST users register. */
productRouter.post('/',
    filterRoute,
    validate('products', '/', 'POST'),
    fieldStateChecker,
    (req, res) => {
        productController(req, res);
    });

/* PUT users register. */
productRouter.put('/:id',
    filterRoute,
    validate('products', '/', 'PUT'),
    fieldStateChecker,
    (req, res) => {
        productController(req, res);
    });

/* DELETE users register. */
productRouter.delete('/:id',
    filterRoute,
    validate('products', '/', 'DELETE'),
    fieldStateChecker,
    (req, res) => {
        productController(req, res);
    });

module.exports = productRouter;
