const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const {connectDB, closeDB} = require('./database.js')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {

    await connectDB();

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    res.status(200).json({ message: 'Login successful', username });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/snakes', async (_, res) => {
  try {
    await connectDB();
    const users = await User.find({ username: /snake/i });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching snake users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/users', async (req, res) => {
  const { search } = req.query;

  try {
    await connectDB();
    const users = await User.find({ username: { $regex: search, $options: 'i' } });
    res.status(200).json(users);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
