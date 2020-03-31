import express from 'express';

import authController from '../auth/auth-controller';
import { validate, fieldStateChecker } from '../middlewares/field-validator';

let authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and management
 */

/**
 * @swagger
 *
 * definitions:
 *   Login:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       timestamp:
 *         type: integer
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application with respective user role
 *     tags: [Authentication]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return JWT token with user role inside the body
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Login'
 */
authRouter.post('/login',
    validate('auth', '/login', 'POST'),
    fieldStateChecker,
    (req, res) => {
        authController(req, res);
    });

/**
 * @swagger
 *
 * definitions:
 *   Registration:
 *     type: object
 *     required:
 *       - firstName
 *       - lastName
 *       - gender
 *       - email
 *       - password
 *       - role
 *     properties:
 *       timestamp:
 *         type: integer
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       gender:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       role:
 *         type: string
 *       resetToken:
 *         type: string
 */

/**
 * @swagger
 * /register:
 *   post:
 *     description: Register to the application with respective user role
 *     tags: [Authentication]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return JWT token with user role inside the body
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Registration'
 */
authRouter.post('/register',
    validate('auth', '/register', 'POST'),
    fieldStateChecker,
    (req, res) => {
        authController(req, res);
    });

/**
 * @swagger
 *
 * definitions:
 *   ResetPassword:
 *     type: object
 *     required:
 *       - email
 *     properties:
 *       email:
 *         type: string
 *         format: email
 */

/**
 * @swagger
 * /reset-password:
 *   post:
 *     description: Reset user account password
 *     tags: [Authentication]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return success response
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ResetPassword'
 */
authRouter.post('/reset-password',
    validate('auth', '/reset-password', 'POST'),
    fieldStateChecker,
    (req, res) => {
        authController(req, res);
    });

/**
 * @swagger
 *
 * definitions:
 *   ResetPasswordToken:
 *     type: object
 *     required:
 *       - email
 *     properties:
 *       password:
 *         type: string
 *         format: password
 */

/**
 * @swagger
 * /reset-password/{resetToken}:
 *   put:
 *     description: Reset user account password
 *     tags: [Authentication]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return success response
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ResetPasswordResetToken'
 */
authRouter.put('/reset-password/:resetToken',
    validate('auth', '/reset-password', 'PUT'),
    fieldStateChecker,
    (req, res) => {
        authController(req, res);
    });

module.exports = authRouter;
