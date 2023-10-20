const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    conf_password: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;