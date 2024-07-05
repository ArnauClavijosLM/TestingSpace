const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('express');
const crypto = require('crypto');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    salt: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);

function hashPassword(password, salt) {
    return crypto.createHash('sha3-512').update(password + salt).digest('hex');
}

async function encryptAllUserPasswords() {
    try {
        const users = await User.find({});
        for (let user of users) {
            const salt = crypto.randomBytes(256).toString('hex');

            user.salt = salt;
            user.hash = hashPassword(user.password, salt);
            await user.save();
            }
    } catch (error) {
        console.error('Error encrypting user passwords:', error);
    }
}
encryptAllUserPasswords()
    .finally(() => mongoose.connection.close());
