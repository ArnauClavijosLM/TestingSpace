const express = require('express');
const authMiddleware = require('../libraries/authorizationMiddleware.js');
const { User } = require('../database/models/User');
const { connectDB, closeDB } = require('../database/database.js');

const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.get('/snakes', async (_, res) => {
  try {
    await connectDB();
    const users = await User.find({ username: /snake/i });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await closeDB();
  }
});

privateRouter.get('/users', async (req, res) => {
  const { search } = req.query;

  try {
    await connectDB();
    const users = await User.find({ username: { $regex: search, $options: 'i' } });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await closeDB();
  }
});

module.exports = privateRouter;
