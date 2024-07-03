const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let connection

const connectDB = async () => {
  try {
    if (!connection) {
      console.log("Connecting")
      connection = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    return connection
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    if (connection) {
      await connection.close();
    }
  }
  catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1);
  }
};

module.exports = {connectDB, closeDB};
