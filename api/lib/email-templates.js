const generateValidation = (props) => {
    const { email, validationCode } = props;
    const to = email;
    const subject = 'Please confirm your email';
    const text = `Please use the following code ${validationCode} to login.`;
    const html = `<p>Please use the following code <strong>${validationCode}</strong> to login.</p>`
    return { to, subject, text, html };
}

const newValidation = () => {
    const { email, validationCode } = props;
    const to = email;
    const subject = 'Please confirm your email';
    const text = `Please use the following code ${validationCode} to login.`;
    const html = `<p>Please use the following code <strong>${validationCode}</strong> to login.</p>`
    return { to, subject, text, html };
}

module.exports.generateValidation = generateValidation;
module.exports.newValidation = newValidation;
