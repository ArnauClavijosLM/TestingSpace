const { connectDB, closeDB } = require('../database/database.js');
const { User } = require('../database/models/User.js');
const { generateSalt, hashPassword } = require('../libraries/encryptionLib.js');

async function encryptOrCreateUser(username, password) {
  await connectDB();
  let user = await User.findOne({ username });

  if (!user) {

    const salt = generateSalt();
    const hash = hashPassword(password, salt);

    user = new User({ username, hash, salt });

    await user.save();
  } else {
    const salt = generateSalt();

    user.salt = salt;
    user.hash = hashPassword(password, salt);

    await user.save();
  }
}

const [username, password] = process.argv.slice(2);

if (!username || !password) {
  throw new Error('Incorrect username or password');
}

encryptOrCreateUser(username, password)
.then(() => {
  console.log('User encrypted correctly');
  })
  .catch(err => console.error('Error encrypting user:', err))
  .finally(async () => {
    await closeDB();
    process.exit(0);
  });
