import sgMail from '@sendgrid/mail';
import config from '../../config/config';
import normalizedRequest from '../normalize-request';

function response({
    response,
    code
}) {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode: code,
        data: JSON.stringify({
            response
        })
    };
}

export default async function handle(req, res) {

    const httpRequest = normalizedRequest(req);

    switch (httpRequest.path) {
        case '/userresponse':
            let respond = await sendUserResponse(httpRequest.body);
            res.send(respond);
        case '/send_email':
            respond = await sendInvoice(httpRequest.body);
            res.send(respond);
        default:
            break;
    }

    async function sendEmail(email) {
        sgMail.setApiKey(config.sendGridApiKey);
        const msg = {
            to: email.to,
            from: email.from,
            subject: email.subject,
            text: email.text,
            html: email.text
        };
        await sgMail.send(msg);

        let respondObj = response({
            'response': {
                'success': true
            },
            'code': '1',
        });
        return respondObj;
    }

    // eslint-disable-next-line no-unused-vars
    async function sendUserResponse(req, res) {
        try {
            let email = {
                to: process.env.ADMIN_EMAIL,
                from: req.sender,
                subject: req.subject,
                text: req.text,
                html: req.text
            };
            return sendEmail(email);
        } catch (e) {
            return e;
        }

    }

    // eslint-disable-next-line no-unused-vars
    async function sendInvoice(req, res) {

    }

    // eslint-disable-next-line no-unused-vars
    async function sendForgetPassword(obj) {
        sendEmail(email);
    }
}
