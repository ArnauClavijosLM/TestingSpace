const mongoose = require('mongoose');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const generateRandomUsers = async (numUsers) => {
  for (let i = 0; i < numUsers; i++) {
    const username = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
    const password = uniqueNamesGenerator({ dictionaries: [colors] });

    const user = new User({
      username,
      password,
    });

    await user.save();
    console.log(`User ${username} saved to the database`);
  }
};

generateRandomUsers(1)
  .then(() => {
    console.log('Random users generated and saved to the database');
  })
  .catch(err => console.error('Error generating users:', err))
  .finally(mongoose.connection.close)
