import sgMail from '@sendgrid/mail';
import config from '../../config/config';
import normalizedRequest from '../../helpers/utilities/normalize-request';

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
        await sendUserResponse(httpRequest.body).then((response) => {
            res.send(response);
        });

        break;
    case '/send_email':
        await sendInvoice(httpRequest.body).then((response) => {
            res.send(response);
        });
        break;
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

        return response({
            'response': {
                'success': true
            },
            'code': '1',
        });
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
        sendEmail(obj);
    }
}
