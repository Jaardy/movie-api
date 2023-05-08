const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Oh Hi there Bugosha");
});

app.use("/users", require("./routes/users.js"));
app.use("/shows", require("./routes/shows.js"));

app.use((error, req, res, next) => {
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = app;
