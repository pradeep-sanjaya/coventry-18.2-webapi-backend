import express from 'express';

let metaDataRouter = express.Router();

import metaDataController from '../meta-data/meta-data-controller';
import filterRoute from '../middlewares/route-filter';
import { fieldStateChecker, validate } from '../middlewares/field-validator';

metaDataRouter.post('/discount-codes',
    filterRoute,
    validate('meta-data', '/discount-codes', 'POST'),
    fieldStateChecker,
    (req, res) => {
        metaDataController(req, res);
    });

metaDataRouter.get('/discount-codes', filterRoute, (req, res) => {
    metaDataController(req, res);
});

metaDataRouter.get('/discount-codes/:id', filterRoute, (req, res) => {
    metaDataController(req, res);
});

metaDataRouter.put('/discount-codes/:id',
    filterRoute,
    validate('meta-data', '/discount-codes', 'PUT'),
    fieldStateChecker,
    (req, res) => {
        metaDataController(req, res);
    });

metaDataRouter.delete('/discount-codes/:id',
    filterRoute,
    (req, res) => {
        metaDataController(req, res);
    });

module.exports = metaDataRouter;
