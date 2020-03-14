require('dotenv').config({
  path: __dirname + '/.env'
})
import express from "express";

import bodyParser from "body-parser";

import db from "./helpers/database";

import productsController from './products/product-controller'

import usersController from './users/user-controller'

import authenticateJWT from './middlewares/_auth'

import _authrouter from './routes/_auth'

const app = express();

app.use(bodyParser.json());

db();

app.all('/api/v1/products', authenticateJWT, productsController)

app.use('/api/v1/auth', _authrouter)

app.listen(4000, () => console.log(`Listening on port ${process.env.WEB_PORT}`));