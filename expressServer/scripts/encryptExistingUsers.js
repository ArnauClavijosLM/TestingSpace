const mongoose = require('mongoose');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { connectDB, closeDB } = require('../libraries/database.js');
const { hashPassword } = require('../libraries/hashPassword.js');

dotenv.config();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: false },
    salt: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);

async function encryptAllUserPasswords() {
    const batchSize = 1000;
    let totalProcessed = 0;

    try {
        await connectDB();

        while (true) {
            const users = await User.find({}).limit(batchSize);
            if (users.length === 0) break

            for (let user of users) {
                const salt = crypto.randomBytes(256).toString('hex');

                console.log(user.username);

                user.salt = salt;
                user.hash = hashPassword(user.password, salt);
                await user.save();
                totalProcessed++;
            }
            console.log(`Processed ${totalProcessed} users.`);
        }
    } catch (error) {
        console.error('Error encrypting user passwords:', error);
    } finally {
        await closeDB();
    }
}

encryptAllUserPasswords();


encryptAllUserPasswords();
