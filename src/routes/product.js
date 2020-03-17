import express from 'express';
import productController from '../products/product-controller';

let productRouter = express.Router();

productRouter.get('/', function (req, res, next) {
    productController(req, res);
});

/* GET product by id. */
productRouter.all('/:id', function (req, res, next) {
    productController(req, res);
});

/* POST users register. */
productRouter.post('/', function (req, res, next) {
    productController(req, res);
});

module.exports = productRouter;
