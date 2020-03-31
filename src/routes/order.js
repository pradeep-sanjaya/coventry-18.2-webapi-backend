import express from 'express';

import orderController from '../order/order-controller';
import authenticateJWT from '../middlewares/auth';
import { fieldStateChecker, validate } from '../middlewares/field-validator';

const orderRouter = express.Router();

orderRouter.post('/',
    authenticateJWT,
    validate('orders', '/', 'POST'),
    fieldStateChecker,
    (req, res) => {
        orderController(req, res);
    });

orderRouter.get('/:userId',
    authenticateJWT,
    validate('orders', '/', 'GET'),
    fieldStateChecker,
    (req, res) => {
        orderController(req, res);
    });

module.exports = orderRouter;
