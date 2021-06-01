const express = require("express");
const _ = require("lodash");
const { Game, validate } = require("../models/games");
const auth = require("../middleware/auth");
const router = express.Router();

// specific game
router.get("/:gameId", auth, async (req, res) => {
  const game = await Game.findById(req.params.gameId);
  res.send(game);
});

// gets back all the games
router.get("/", auth, async (req, res) => {
  const game = await Game.find();
  res.send(game);
});

// submits a new game
router.post("/", auth, async (req, res) => {
  console.log("req", req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //if (error) console.log(error.details[0].message);
  let game = new Game(_.pick(req.body, ["team_name", "team_id", "players"]));
  await game.save();
  res.send(_.pick(game, ["_id", "team_name", "players"]));
});

module.exports = router;
