import express from 'express';

let mailRouter = express.Router();

import sendEmail from '../helpers/mail/mailer';


mailRouter.post('/userresponse', (req, res) => {
    sendEmail(req, res);

});


module.exports = mailRouter;
