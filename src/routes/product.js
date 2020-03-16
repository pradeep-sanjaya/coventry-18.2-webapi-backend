import express from 'express';
import productController from '../products/product-controller';

let productRouter = express.Router();

productRouter.get('/', function (req, res, next) {
    productController(req,res);
});

productRouter.post('/', function (req, res, next) {
    productController(req,res);
});

productRouter.post('/categories', function (req, res, next) {
    productController(req,res);
});

productRouter.get('/categories', function (req, res, next) {
    productController(req,res);
});

module.exports = productRouter;
