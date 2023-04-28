// const app = require('./app')
require('dotenv').config()
const mongoose = require('mongoose');

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.connect(MONGO_CONNECTION_STRING)
  .then(() => console.log('Database connection successful'));

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
