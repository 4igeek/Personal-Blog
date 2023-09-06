const mongoose = require('mongoose');
const { Schema, model } = mongoose

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    password: { type: String }, // User for non social login (if set user is validated).
    validationCode: { type: String }, // Sent to new (non social signups).
    profilePicture: { type: String }
})

const UserModel = model('User', UserSchema);
module.exports = UserModel;