import express from 'express';

import categoryController from '../categories/category-controller';
import filterRoute from '../middlewares/route-filter';
import { fieldStateChecker, validate } from '../middlewares/field-validator';

let categoryRouter = express.Router();

/* GET categories. */
categoryRouter.get('/',
    filterRoute,
    (req, res) => {
        categoryController(req, res);
    });

/* GET category by id. */
categoryRouter.get('/:id',
    filterRoute,
    (req, res) => {
        categoryController(req, res);
    });

/* POST categories. */
categoryRouter.post('/',
    filterRoute,
    validate('categories', '/', 'post'),
    fieldStateChecker,
    (req, res) => {
        categoryController(req, res);
    });

categoryRouter.put('/:id',
    filterRoute,
    fieldStateChecker,
    (req, res) => {
        categoryController(req, res);
    });

categoryRouter.delete('/:id',
    filterRoute,
    fieldStateChecker,
    (req, res) => {
        categoryController(req, res);
    });

module.exports = categoryRouter;
