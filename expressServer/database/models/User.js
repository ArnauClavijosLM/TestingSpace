const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    hash: { type: String, required: false },
    salt: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);

module.exports = { userSchema, User };
