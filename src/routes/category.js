import express from 'express';
import categoryController from '../categories/category-controller';

let categoryRouter = express.Router();

/* GET categories. */
categoryRouter.get('/', (req, res) => {
    categoryController(req, res);
});

/* GET category by id. */
categoryRouter.all('/:id', (req, res) => {
    categoryController(req, res);
});

/* POST categories. */
categoryRouter.post('/', (req, res) => {
    categoryController(req, res);
});


module.exports = categoryRouter;
