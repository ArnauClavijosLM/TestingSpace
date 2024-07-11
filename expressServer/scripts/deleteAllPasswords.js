const dotenv = require('dotenv');
const { connectDB, closeDB } = require('../database/database.js');
const { User } = require('../database/models/User.js');

dotenv.config();

async function encryptAllUserPasswords() {
    const batchSize = 1000;
    let totalProcessed = 0;
    let skip = 0;

    try {
        await connectDB();

        while (true) {
            const users = await User.find({}).skip(skip).limit(batchSize);
            if (users.length === 0) break;

            for (let user of users) {

                delete user.password;

                await user.save();
                totalProcessed++;
            }
            console.log(`Processed ${totalProcessed} users.`);
            skip += batchSize;
        }
    } catch (error) {
        console.error('Error deleting user passwords:', error);
    } finally {
        await closeDB();
    }
}

encryptAllUserPasswords()
    .then(() => {
        console.log('Random users generated and saved to the database');
    });
