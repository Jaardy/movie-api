const express = require("express");
const { Show } = require("../models");
const router = express.Router();

/**
 * GET /shows
 * @summary Returns all shows
 * @return object[] an array of objects with all listed shows
 */

router.get("/", async (req, res, next) => {
  const shows = await Show.findAll();

  res.send(shows);
});

router.get("/:show", (req, res, next) => {
  res.send("One show");
});

module.exports = router;
