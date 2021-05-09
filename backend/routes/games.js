const express = require("express");
const _ = require("lodash");
const { Game, validateGame } = require("../models/games");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { error } = validateGame(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let game = new Game({
    user_id: req.user._id,
    cashing: req.body.cashing,
    profit: req.body.profit,
    rank: req.body.rank,
  });

  let post = await game.save();
  res.send(post);
});

module.exports = router;
