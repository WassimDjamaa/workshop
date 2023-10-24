const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    conf_password: String,
});

const users = mongoose.model('users', userSchema);

module.exports = users;