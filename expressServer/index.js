const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
  console.log("Database connected to index")

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Received login request for:', username);

    const db = mongoose.connection;
    const collection = db.collection('users');

    const user = await collection.findOne({ username });

    if (!user || user.pasword !== password) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Incorrect password' });
    }

    console.log('User found:', user);
    console.log('User authenticated:', username);

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
