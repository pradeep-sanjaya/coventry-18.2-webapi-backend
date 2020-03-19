import express from 'express';

let metaDataRouter = express.Router();

import metaDataController from '../meta-data/meta-data-controller';

metaDataRouter.post('/discount-codes', (req, res) => {
    metaDataController(req, res);
});

metaDataRouter.get('/discount-codes', (req, res) => {
    metaDataController(req, res);
});

metaDataRouter.get('/discount-codes/:id', (req, res) => {
    metaDataController(req, res);
});

metaDataRouter.put('/discount-codes/:id', (req, res) => {
    metaDataController(req, res);
});

metaDataRouter.delete('/discount-codes/:id', (req, res) => {
    metaDataController(req, res);
});

module.exports = metaDataRouter;
