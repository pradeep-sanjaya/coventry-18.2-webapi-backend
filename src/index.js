import config from "./config/config";

import express from "express";

import bodyParser from "body-parser";

import database from "./helpers/database";

import productsController from './products/product-controller'

import authenticateJWT from './middlewares/_auth'

import authRouter from './routes/_auth'

const app = express();

app.use(bodyParser.json());

database();

app.all('/api/v1/products', authenticateJWT, productsController);

app.use('/api/v1/auth', authRouter);

app.listen(config.apiPort, () => console.log(`Listening on port ${config.apiPort}`));