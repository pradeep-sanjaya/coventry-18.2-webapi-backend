import express from 'express';

import cartController from '../cart/cart-controller';
import authenticateJWT from '../middlewares/auth';

const cartRouter = express.Router();

cartRouter.post('/products', authenticateJWT, (req, res) => {
    cartController(req, res);
});

cartRouter.put('/products/:userId', authenticateJWT, (req, res) => {
    cartController(req, res);
});

cartRouter.get('/products/:userId', authenticateJWT, (req, res) => {
    cartController(req, res);
});

module.exports = cartRouter;
