import express from 'express';

let mailRouter = express.Router();

import sendEmail from '../helpers/mail/mailer';

mailRouter.post('/user-response', (req, res) => {
    sendEmail(req, res);
});

module.exports = mailRouter;
