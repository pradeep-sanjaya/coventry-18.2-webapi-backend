require('dotenv').config({
  path: __dirname + '/.env'
})
import express from "express";

import bodyParser from "body-parser";

import db from "./helpers/database";

import productsController from './products/product-controller'

const app = express();

app.use(bodyParser.json());

db();

app.all('/products', productsController)

app.get('/products/:id', productsController)


app.listen(4000, () => console.log(`Listening on port ${process.env.WEB_PORT}`));