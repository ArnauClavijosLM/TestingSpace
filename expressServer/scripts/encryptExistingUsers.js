const dotenv = require('dotenv');
const { connectDB, closeDB } = require('../database/database.js');
const { hashPassword } = require('../libraries/hashPassword.js');
const { generateSalt } = require('../libraries/saltUsername.js');
const { User } = require('../database/models/User.js');

dotenv.config();

async function encryptAllUserPasswords() {
    const batchSize = 1000;
    let totalProcessed = 0;
    let skip = 0;

    try {
        await connectDB();

        while (true) {
            const users = await User.find({}).sort({ _id: 1 }).skip(skip).limit(batchSize);
            if (users.length === 0) break;

            for (let user of users) {
                const salt = generateSalt();
                user.salt = salt;
                user.hash = hashPassword(user.password, salt);

                await user.save();
                totalProcessed++;
            }
            console.log(`Processed ${totalProcessed} users.`);
            skip += batchSize;
        }
    } catch (error) {
        console.error('Error encrypting user passwords:', error);
    } finally {
        await closeDB();
    }
}

encryptAllUserPasswords()
    .then(() => {
        console.log('Random users generated and saved to the database');
    });
