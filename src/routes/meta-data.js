import express from 'express';

let metaDataRouter = express.Router();

import metaDataController from '../meta-data/meta-data-controller';
import filterRoute from '../middlewares/route-filter';

metaDataRouter.post('/discount-codes',
    filterRoute,
    // validate('meta-data', '/discount-codes', 'post'),
    // fieldStateChecker,
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
    // validate('meta-data', '/discount-codes', 'put'),
    // fieldStateChecker,
    (req, res) => {
        metaDataController(req, res);
    });

metaDataRouter.delete('/discount-codes/:id',
    filterRoute,
    (req, res) => {
        metaDataController(req, res);
    });

module.exports = metaDataRouter;
