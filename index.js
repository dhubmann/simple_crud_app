const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const db = process.env.DATABASE_URL;
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});

mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log(`Server running on port ${port}...`);
    });
  })
  .catch(() => console.log("Connection failed!"));
