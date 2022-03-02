// Imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000; // 5000
const DB_URI =
  "mongodb+srv://a3gisce:fP40ojy3QJErDn8c@cluster0.4a8cr.mongodb.net/CookBook?retryWrites=true&w=majority";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Database connection
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

// Start server
app.listen(port, () => console.log(`Server is running on ${port}`));
