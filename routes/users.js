const express = require("express");
const { User, Show } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ["username"] });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkValidUserId, async (req, res, next) => {
  const { username } = req.user;
  res.json({ username });
});

router.put("/:id", checkValidUserId, async (req, res, next) => {
  const { user } = req;
  const { showId } = req.body;

  try {
    const show = await Show.findByPk(showId);
    await user.addShow(show);
    res
      .status(201)
      .send({ message: "Show successfully added to user's watch list" });
  } catch (error) {
    next(error);
    return;
  }
});

router.get("/:id/shows", checkValidUserId, async (req, res, next) => {
  const { shows } = req.user;
  res.json(shows);
});

async function checkValidUserId(req, res, next) {
  const { id } = req.params;
  const user = await User.findByPk(id, { include: Show });
  if (user) {
    req.user = user;
    next();
    return;
  }
  res.status(401);
  next(new Error("Unable to find requested resource."));
  return;
}

module.exports = router;
