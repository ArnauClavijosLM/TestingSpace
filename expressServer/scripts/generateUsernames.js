const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const dotenv = require('dotenv');
const { connectDB, closeDB } = require('../database/database.js');
const { User } = require('../database/models/User.js');

dotenv.config();

const generateRandomUsers = async (numUsers, batchSize) => {
  connectDB();

  let users = [];

  for (let i = 0; i < numUsers; i++) {
    const username = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
    const password = uniqueNamesGenerator({ dictionaries: [colors] });

    users.push({
      username,
      password,
    });

    if (users.length === batchSize) {
      await User.insertMany(users);
      users = [];
    }
  }

  if (users.length > 0) {
    await User.insertMany(users);
  }
};

generateRandomUsers(1000, 200)
  .then(() => {
    console.log('Random users generated and saved to the database');
  })
  .catch(err => console.error('Error generating users:', err))
  .finally(() => closeDB(), process.exit(0));
