const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let connection;

const connectDB = async () => {
  try {
    if (!connection) {
      console.log("Connecting to MongoDB");
      connection = await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    }
    return connection;
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    if (connection) {
      await connection.disconnect();
      console.log("Disconnected from MongoDB");
    }
  } catch (err) {
    console.error('Could not disconnect from MongoDB', err);
    process.exit(1);
  }
};

module.exports = { connectDB, closeDB };
