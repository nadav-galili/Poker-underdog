const express = require("express");
const _ = require("lodash");
const { Team, validate } = require("../models/teams");
const auth = require("../middleware/auth");
const router = express.Router();

// specific team
router.get("/:teamId", auth, async (req, res) => {
  const team = await Team.findById(req.params.teamId);
  res.send(team);
});

// gets back all the teams
router.get("/", auth, async (req, res) => {
  const team = await Team.find();
  res.send(team);
});

// submits a new team
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let team = new Team(_.pick(req.body, ["name", "players"]));
  await team.save();
  res.send(_.pick(team, ["_id", "name", "players"]));
});

module.exports = router;
