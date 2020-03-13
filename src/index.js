import config from "./config/config";

import express from "express";

import bodyParser from "body-parser";

import database from "./helpers/database";

import productsController from './products/product-controller'

const app = express();

app.use(bodyParser.json());

database();

app.all('/products', productsController);

app.get('/products/:id', productsController);

app.listen(4000, () => console.log(`Listening on port ${config.databasePort}`));
