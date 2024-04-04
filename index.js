const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const app = express();
const db = process.env.DATABASE_URL;
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});

// get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add a new product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
