import express from 'express';
var _productRouter = express.Router();
import productController from '../products/product-controller'

/* GET users login. */
_productRouter.get('/', function (req, res, next) {
    productController(req,res)
});

/* POST users register. */
_productRouter.post('/', function (req, res, next) {
    productController(req,res)
});

/* POST add category. */
_productRouter.post('/category', function (req, res, next) {
    productController(req,res)
});

/* POST add category. */
_productRouter.get('/category', function (req, res, next) {
    productController(req,res)
});

module.exports = _productRouter;