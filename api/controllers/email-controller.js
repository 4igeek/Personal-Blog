const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const template = require('../lib/email-templates');
const email = require('../lib/email-elements');
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const getEmailConfig = (props) => {
    const { text } = props;
    const fromName = process.env.FROM_NAME;
    const fromEmail = process.env.FROM_EMAIL;
    const replyName = process.env.REPLY_NAME;
    const replyEmail = process.env.REPLY_EMAIL;
    const header = email.getEmailHeader({
        preheaderText: text, companyName: fromName,
    })
    const footer = email.getEmailFooter();
    return { header, footer, fromName, fromEmail, replyName, replyEmail };
}

const getTemplate = (props) => {
    const { type, email } = props;
    const validationCode = props.validationCode ? props.validationCode : '';
    switch (type) {
        case 'generate-validation':
            return template.generateValidation({ email, validationCode });
        case 'new-validation':
            return template.newValidation({ email, validationCode });
    }
}

const sendEmail = async (props) => {
    const { to, subject, text, html } = getTemplate({ ...props });
    const { header, footer, fromName, fromEmail } = getEmailConfig({ text });
    const msg = {
        to,
        from: { name: fromName, email: fromEmail },
        // replyTo: { email: replyName, name: replyEmail },
        subject,
        text,
        html: header + html + footer,
    };
    sgMail
        .send(msg)
        .then(() => { }, error => {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
            } else {
                console.log('Eamil sent');
            }
        });
}

module.exports.sendEmail = sendEmail;
