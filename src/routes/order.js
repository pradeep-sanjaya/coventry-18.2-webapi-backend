import express from 'express';

import orderController from '../order/order-controller';
import authenticateJWT from '../middlewares/auth';

const orderRouter = express.Router();

orderRouter.post('/', authenticateJWT, (req, res) => {
    orderController(req, res);
});

module.exports = orderRouter;
