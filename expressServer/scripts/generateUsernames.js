const mongoose = require('mongoose');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const dotenv = require('dotenv');
const { connectDB, closeDB } = require('../libraries/database.js');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const generateRandomUsers = async (numUsers, batchSize) => {
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
      console.log(`Batch of ${batchSize} users saved to the database`);
      users = [];
    }
  }

  if (users.length > 0) {
    await User.insertMany(users);
    console.log(`Final batch of ${users.length} users saved to the database`);
  }
};

generateRandomUsers(10000, 10)
  .then(() => {
    console.log('Random users generated and saved to the database');
  })
  .catch(err => console.error('Error generating users:', err))
  .finally(() => mongoose.connection.close());
