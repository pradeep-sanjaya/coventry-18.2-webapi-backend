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
    validate('categories', '/', 'GET'),
    fieldStateChecker,
    (req, res) => {
        categoryController(req, res);
    });

/* POST categories. */
categoryRouter.post('/',
    filterRoute,
    validate('categories', '/', 'POST'),
    fieldStateChecker,
    (req, res) => {
        categoryController(req, res);
    });

categoryRouter.put('/:id',
    filterRoute,
    validate('categories', '/', 'PUT'),
    fieldStateChecker,
    (req, res) => {
        categoryController(req, res);
    });

categoryRouter.delete('/:id',
    filterRoute,
    validate('categories', '/', 'DELETE'),
    fieldStateChecker,
    (req, res) => {
        categoryController(req, res);
    });

module.exports = categoryRouter;
