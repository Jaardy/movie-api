const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send("Oh Hi there Bugosha");
});

app.get("/users", (req, res, next) => {
  res.send("graaaaaat");
});

app.get("/users/:id", (req, res, next) => {
  res.send("graaaaaat");
});

module.exports = app;
