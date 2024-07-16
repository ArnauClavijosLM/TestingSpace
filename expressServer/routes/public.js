const express = require('express');
const { User } = require('../database/models/User');
const { hashPassword } = require('../libraries/encryptionLib.js');
const { connectDB, closeDB } = require('../database/database.js');
const jwt = require('jsonwebtoken');

const publicRouter = express.Router();

publicRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    await connectDB();

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const salt = user.salt;
    const introducedHash = hashPassword(password, salt);

    console.log("success 1")

    if (introducedHash !== user.hash) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    console.log("success 2")

    const token = generateJWT(user);

    console.log("success 5")
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await closeDB();
  }
});

const generateJWT = (user) => {
    console.log("success 3")
  const payload = { userId: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  console.log("success 4")
  return token;
};

module.exports = publicRouter;
