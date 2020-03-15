import express from 'express';
import swaggerUi from 'swagger-ui-express';

import * as specs from '../swagger';

let apiDocsRouter = express.Router();

apiDocsRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs.default));

module.exports = apiDocsRouter;
