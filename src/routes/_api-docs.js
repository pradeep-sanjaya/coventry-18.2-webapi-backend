import express from 'express';
import swaggerUi from 'swagger-ui-express';

import * as specs from '../swagger';

let _apiDocsRouter = express.Router();

_apiDocsRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default));

module.exports = _apiDocsRouter;
