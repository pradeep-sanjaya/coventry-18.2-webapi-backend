import express from 'express';
import categoryController from '../categories/category-controller';

let categoryRouter = express.Router();

/* GET categories. */
categoryRouter.get('/', function (req, res, next) {
    categoryController(req, res);
});

/* GET category by id. */
categoryRouter.all('/:id', function (req, res, next) {
    categoryController(req, res);
});

/* POST categories. */
categoryRouter.post('/', function (req, res, next) {
    categoryController(req, res);
});


module.exports = categoryRouter;