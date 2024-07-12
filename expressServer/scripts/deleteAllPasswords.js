const dotenv = require('dotenv');
const { connectDB, closeDB } = require('../database/database.js');
const { User } = require('../database/models/User.js');

dotenv.config();

async function deleteAllUserPasswords() {
    const batchSize = 1000;
    let totalProcessed = 0;
    let skip = 0;


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
}

deleteAllUserPasswords()
  .then(() => {
    console.log('Deleted all user passwords');
  })
  .catch(err => console.error('Error deleting user passwords:', err))
  .finally(async () => {
    await closeDB();
    process.exit(0);
  });
