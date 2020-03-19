import express from 'express';

import categoryController from '../categories/category-controller';
import filterRoute from '../middlewares/route-filter';

let categoryRouter = express.Router();

/* GET categories. */
categoryRouter.get('/', filterRoute, (req, res) => {
    categoryController(req, res);
});

/* GET category by id. */
categoryRouter.all('/:id', filterRoute, (req, res) => {
    categoryController(req, res);
});

/* POST categories. */
categoryRouter.post('/', filterRoute, (req, res) => {
    categoryController(req, res);
});


module.exports = categoryRouter;
