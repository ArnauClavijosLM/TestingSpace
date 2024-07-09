const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {connectDB, closeDB} = require('./libraries/database.js')

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
  } finally {
    closeDB();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
