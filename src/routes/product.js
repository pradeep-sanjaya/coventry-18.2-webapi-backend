import express from 'express';
import productController from '../products/product-controller';
import filterRoute from '../middlewares/route-filter';

let productRouter = express.Router();

productRouter.get('/', filterRoute,(req, res) => {
    productController(req, res);
});

/* GET product by id. */
productRouter.all('/:id',filterRoute, (req, res) => {
    productController(req, res);
});

/* POST users register. */
productRouter.post('/', filterRoute,(req, res) => {
    productController(req, res);
});

module.exports = productRouter;
