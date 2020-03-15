import express from 'express';
import productController from '../products/product-controller';

let productRouter = express.Router();

/* GET users login. */
productRouter.get('/', function (req, res, next) {
	productController(req,res);
});

/* POST users register. */
productRouter.post('/', function (req, res, next) {
	productController(req,res);
});

/* POST add category. */
productRouter.post('/category', function (req, res, next) {
	productController(req,res);
});

/* POST add category. */
productRouter.get('/category', function (req, res, next) {
	productController(req,res);
});

module.exports = productRouter;
