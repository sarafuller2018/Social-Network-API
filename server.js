// imports necessary files/packages
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// creates port and express variable
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// starts the port
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}!`);
  });
});