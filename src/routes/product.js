import express from 'express';
import productController from '../products/product-controller';
import filterRoute from '../middlewares/route-filter';
import { validate } from '../middlewares/field-validator';

let productRouter = express.Router();

productRouter.get('/', filterRoute, (req, res) => {
    productController(req, res);
});

/* GET product by id. */
productRouter.get('/:id', filterRoute, (req, res) => {
    productController(req, res);
});

/* POST users register. */
productRouter.post('/',
    filterRoute,
    validate('products', '/', 'post'),
    (req, res) => {
        productController(req, res);
    });

module.exports = productRouter;
