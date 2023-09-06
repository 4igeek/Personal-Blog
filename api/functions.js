const generateVerificationCode = () => {
    let randomCode = ''
    for (let i = 0; i < 6; i++) {
        randomCode += Math.floor(Math.random() * 10);
    }
    return randomCode;
}

module.exports.generateVerificationCode = generateVerificationCode;