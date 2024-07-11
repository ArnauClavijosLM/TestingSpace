const { connectDB, closeDB } = require('../database/database.js');
const { hashPassword } = require('../libraries/hashPassword.js');
const { User } = require('../database/models/User.js');
const { saltUsername } = require('../libraries/saltUsername.js');

async function encryptOrCreateUser(username, password) {
  try {
    await connectDB();
    let user = await User.findOne({ username });

    if (!user) {

      const salt = saltUsername();
      const hash = hashPassword(password, salt);

      user = new User({ username, hash, salt });

      await user.save();
    } else {
      const salt = saltUsername();

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
  throw new Error('Incorrect username or password');
}

encryptOrCreateUser(username, password)
  .then(() => {
    console.log('User Encrypted');
  });
