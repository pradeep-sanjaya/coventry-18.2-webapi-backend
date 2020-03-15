import sgMail from '@sendgrid/mail';
import config from '../../config/config';

export default async function sendEmail({ from, to, subject, text, html = '<span> '+ text +' </span>' }) {
	sgMail.setApiKey(config.sendGridApiKey);
	const msg = {
		to: to,
		from: from,
		subject: subject,
		text: text,
		html: html
	};
	sgMail.send(msg);
}
