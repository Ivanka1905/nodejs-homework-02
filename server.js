require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const { MONGO_CONNECTION_STRING, PORT = 3000 } = process.env;

mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("The server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
