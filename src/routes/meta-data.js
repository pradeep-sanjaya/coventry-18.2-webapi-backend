import express from 'express';

let metaDataRouter = express.Router();

import metaDataController from '../meta-data/meta-data-controller';

metaDataRouter.get('/secret-questions', (req, res) => {
    metaDataController(req, res);
});

module.exports = metaDataRouter;
