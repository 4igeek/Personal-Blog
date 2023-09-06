const mongoose = require('mongoose');
const User = require('../schema/UserSchema');
const { OAuth2Client } = require('google-auth-library');
const emailer = require('./email-controller')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const functions = require('../functions');

const dotenv = require('dotenv');
dotenv.config();

const saltRounds = 10;
const mongoLink = process.env.MONGO_LINK;
const secret = process.env.JWT_SECRET;

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET
);

mongoose.connect(mongoLink);

const googleLogin = async (req, res) => {
    const token = req.body.credential;
    try {
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload();
        const { email, given_name, family_name, picture } = payload;
        const user = await User.findOne({ email })
        if (!user) {
            // Create new user
            await User.create({
                email, firstname: given_name, lastname: family_name, profilePicture: picture
            })
        } else {
            user.profilePicture = picture;
            try {
                await user.save();
            } catch (error) {
                console.log("Error saving user info to DB: " + error);
            }
        }
        jwt.sign({
            credential: token
        }, secret, {}, (error, userToken) => {
            if (error) res.json('error');
            res.cookie('userToken', userToken).json({
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                profilePicture: user.profilePicture
            });
        });
    } catch (error) {
        res.json({ error })
    }
}

const getProfile = async (req, res) => {
    const token = req.cookies.userToken
    if (token) {
        jwt.verify(token, secret, {}, async (error, info) => {
            if (error) throw error;
            if (info.email) { // If the user is not logged in via social.
                const user = await User.findOne({ email: info.email });
                const { email, firstname, lastname, profilePicture } = user;
                res.json({
                    email, firstname, lastname, profilePicture
                });
            } else { // The user is logged in with Google.
                try {
                    const ticket = await oAuth2Client.verifyIdToken({
                        idToken: info.credential,
                        audience: process.env.GOOGLE_CLIENT_ID
                    })
                    const payload = ticket.getPayload();
                    const { email, given_name, family_name, picture } = payload;
                    const user = await User.findOne({ email });
                    res.json({
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        profilePicture: user.profilePicture
                    });
                } catch (error) {
                    res.json({ error })
                }
            }
        })
    } else {
        res.status(200);
    }
}

const checkUsersEmail = async (req, res) => {
    const { email } = req.body;
    const users = await User.find({ email });
    if (users.length > 0) { // a user has been registered with this email.
        // If user has password respont true
        users[0].password ? res.json(true) : res.json(false);
    } else { // no user has been registered with this email.
        res.json(false);
    }
}

const logout = async (req, res) => {
    res.cookie('userToken', '').json({
        email: '',
        firstname: '',
        lastname: '',
        profilePicture: ''
    });
}

const generateValidationCode = async (req, res) => {
    const { email } = req.body;
    const validationCode = functions.generateVerificationCode();
    // Check if user exists already.
    let user = await User.findOne({ email });
    if (user) { // If they do then update the validation code and return true.
        user.validationCode = validationCode;
        await emailer.sendEmail({ email, type: 'generate-validation', validationCode });
        try {
            await user.save();
            res.json(true);
        } catch (error) {
            console.log('Error saving new validation code: ' + error);
            res.json(false);
        }
    } else { // If not then create new user using only email address and validationCode.
        try {
            await User.create({ email, validationCode });
            await emailer.sendEmail({ email, type: 'new-validation', validationCode });
            res.json(true);
        } catch (error) {
            console.log('Generating security code error: ' + error);
            res.json(false);
        }
    }
}

const submitValidationCode = async (req, res) => {
    const { validationCode, email } = req.body;
    // Find user.
    let user = await User.findOne({ email });
    // Check validation code.
    if (user.validationCode === validationCode) { // If code is valid return true.
        res.json(true);
    } else { // If code is not valid return false.
        res.json(false);
    }
}

const setNewPassword = async (req, res) => {
    const { password, email } = req.body;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            console.log("Error in hashing password: " + err)
            throw err
        };
        const user = await User.findOne({ email });
        user.password = hash;
        try {
            await user.save()
        } catch (error) {
            console.log('Error in saving password: ' + error)
            res.status(400).json(error);
        }
        res.json(user);
    });
}

const login = async (req, res) => {
    const { password, email } = req.body;
    let user = await User.findOne({ email })
    let { firstname, lastname, profilePicture } = user;
    const passAuth = bcrypt.compareSync(password, user.password);
    if (passAuth) {
        jwt.sign({ email }, secret, {}, (error, token) => {
            if (error) throw error;
            res.cookie('userToken', token).json({ email, firstname, lastname, profilePicture });
        })
    } else {
        res.status(400).json('Wrong credentials');
    }
}

const updateAccount = async (req, res) => {
    const token = req.cookies.userToken;
    const { email, firstname, lastname } = req.body;
    if (token) {
        jwt.verify(token, secret, {}, async (error, info) => {
            if (error) throw error;
            const user = await User.findOne({ email });
            user.firstname = firstname;
            user.lastname = lastname;
            await user.save();
            res.status(200).json({ user });
        })
    } else {
        res.status(200).json('No user is logged in');
    }
}

module.exports.login = login;
module.exports.logout = logout;
module.exports.getProfile = getProfile;
module.exports.googleLogin = googleLogin;
module.exports.checkUsersEmail = checkUsersEmail;
module.exports.generateValidationCode = generateValidationCode;
module.exports.submitValidationCode = submitValidationCode;
module.exports.setNewPassword = setNewPassword;
module.exports.updateAccount = updateAccount;