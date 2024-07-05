const mongoose = require('mongoose');
const dotenv = require('dotenv');
const crypto = require('crypto');
const { create } = require('domain');
const prompt = require('prompt-sync')();

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

function hashPassword(password, salt) {
  return crypto.createHash('sha3-512').update(password + salt).digest('hex');
}

function promptForUsernameAndPassword() {
  const username = prompt('Enter username: ');
  const password = prompt('Enter password: ', { echo: '*' });

  if (!username || !password) {
    console.log('Username and password are required');
    return;
  }

  createEncryptedUser(username, password);
}

async function createEncryptedUser(username, password) {
  try {
    let user = await User.findOne({ username });

    if (!user) {
      const salt = crypto.randomBytes(32).toString('hex');
      const hash = hashPassword(password, salt);

      user = new User({ username, hash, salt });

      await user.save();
      console.log(`New user ${username} created successfully`);
    } else {
      const salt = crypto.randomBytes(32).toString('hex');

      user.salt = salt;
      user.hash = hashPassword(password, salt);

      await user.save();
      console.log(`Encrypted password for user: ${user.username}`);
    }
  } catch (error) {
    console.error('Error encrypting or creating user:', error);
  } finally {
    mongoose.connection.close();
  }
}

promptForUsernameAndPassword();
