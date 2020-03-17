import express from 'express';
import bodyParser from 'body-parser';

import config from './config/config';

import initializeDB from './helpers/database';

import authenticateJWT from './middlewares/auth';

import { errorResponse } from './helpers/response/response-dispatcher';

import authRouter from './routes/auth';
import mailRouter from './routes/mail';
import productRouter from './routes/product';
import apiDocsRouter from './routes/api-docs';
import categoryRouter from './routes/category';

import HttpResponseType from './models/http-response-type';

const app = express();

app.use(bodyParser.json());

initializeDB();

app.use('/api/v1/products', authenticateJWT, productRouter);
app.use('/api/v1/categories', authenticateJWT, categoryRouter);
app.use('/api/v1/mail', mailRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api-docs', apiDocsRouter);

app.all('*', (req, res) => {
    return errorResponse(res, HttpResponseType.NOT_FOUND, 'Request URL not found');
});

app.listen(config.apiPort, () => console.log(`Listening on port ${config.apiPort}`));
