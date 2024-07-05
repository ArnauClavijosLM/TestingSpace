const mongoose = require('mongoose');
const dotenv = require('dotenv');
const crypto = require('crypto');

const app = express();

dotenv.config();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    salt: { type: String, required: false }
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

    encryptAllUserPasswords(username, password)
}

async function encryptAllUserPasswords(userN, passW) {

    try {
        const user = await User.find({ userN });
        const salt = crypto.randomBytes(256).toString('hex');

        user.username
        user.salt = salt;
        user.hash = hashPassword(passW, salt);
        await user.save();



        console.log(`Encrypted password for user: ${user.username}`);
        mongoose.connection.close();

    } catch (error) {
        console.error('Error encrypting user passwords:', error);
        mongoose.connection.close();
    }
}

promptForUsernameAndPassword()











async function insertNewUser(username, salt, hash) {
    try {
        const existingUser = await User.findOne({ username: username }).exec();
        if (existingUser) {
        console.log('Username already exists');
        return;
        }

        const newUser = new User({
        username: username,
        password: password
        });

        await newUser.save();

        console.log(`User ${username} created successfully`);
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        mongoose.connection.close();
    }
    }
