const mongoose = require('mongoose');
const crypto = require('crypto');
const { connectDB, closeDB } = require('../libraries/database.js');
const { hashPassword } = require('../libraries/hashPassword.js');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: false },
  salt: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);

hashPassword(password, salt)

async function encryptOrCreateUser(username, password) {
  try {
    await connectDB();
    let user = await User.findOne({ username });

    if (!user) {
      const salt = crypto.randomBytes(32).toString('hex');
      const hash = hashPassword(password, salt);

      user = new User({ username, hash, salt });

      await user.save();
    } else {
      const salt = crypto.randomBytes(32).toString('hex');

      user.salt = salt;
      user.hash = hashPassword(password, salt);

      await user.save();
    }
  } catch (error) {
    console.error('Error encrypting or creating user:', error);
  } finally {
    closeDB();
  }
}

const [username, password] = process.argv.slice(2);

if (!username || !password) {
  console.log('Username and password are required');
  process.exit(1);
}

encryptOrCreateUser(username, password);
