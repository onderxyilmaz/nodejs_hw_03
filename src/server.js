const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const contactsRouter = require("./routers/contacts");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");

const app = express();

app.use(express.json());

// Routers
app.use("/contacts", contactsRouter);

// Handlers
app.use(notFoundHandler);
app.use(errorHandler);

const { PORT = 3000, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });