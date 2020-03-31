import express from 'express';
import userController from '../users/user-controller';
import filterRoute from '../middlewares/route-filter';

let userRouter = express.Router();

/* GET all users */
userRouter.get('/', filterRoute, (req, res) => {
    userController(req, res);
});

/* GET users by id */
userRouter.get('/:id', filterRoute, (req, res) => {
    userController(req, res);
});

module.exports = userRouter;
