const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { connectDB, closeDB } = require('./libraries/database.js');
const { User } = require('./database/models/User.js');
const { hashPassword } = require('./libraries/hashPassword.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const generateJWT = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    await connectDB();

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const salt = user.salt;
    const introducedHash = hashPassword(password, salt);

    if (introducedHash !== user.hash) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    const token = generateJWT(user);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

app.get('/api/snakes', authenticateJWT, async (_, res) => {
  try {
    await connectDB();
    const users = await User.find({ username: /snake/i });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    closeDB();
  }
});

app.get('/api/users', authenticateJWT, async (req, res) => {
  const { search } = req.query;

  try {
    await connectDB();
    const users = await User.find({ username: { $regex: search, $options: 'i' } });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    closeDB();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
