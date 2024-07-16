const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const publicRouter = require('./routes/public');
const privateRouter = require('./routes/private');

app.use('/api', publicRouter);
app.use('/api', privateRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
