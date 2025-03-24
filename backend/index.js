//index.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/index');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
const PORT = 8080 || process.env.PORT;
connectDB().then(
  () => {
    app.listen(PORT, () => {
      console.log('Connected to DB.');
      console.log(`Server running at port ${PORT} `);
    });
  },
  () => {
    console.log('Connection failed.');
  }
);
