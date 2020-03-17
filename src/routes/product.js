import express from 'express';
import productController from '../products/product-controller';

let productRouter = express.Router();

productRouter.get('/', (req, res) => {
    productController(req, res);
});

/* GET product by id. */
productRouter.all('/:id', (req, res) => {
    productController(req, res);
});

/* POST users register. */
productRouter.post('/', (req, res) => {
    productController(req, res);
});

module.exports = productRouter;
