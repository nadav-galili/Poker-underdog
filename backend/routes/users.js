const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateTeams } = require("../models/user");
const auth = require("../middleware/auth");
const { Team } = require("../models/teams");
const router = express.Router();

const getTeams = async (teamsArray) => {
  const teams = await Team.find({ teamNumber: { $in: teamsArray } });
  return teams;
};

//get teams info
router.get("/teams", auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send("Missing numbers data");

  let data = {};
  data.teams = req.query.numbers.split(",");
  const teams = await getTeams(data.teams);
  res.send(teams);
});

//update and add teams to certain user
router.patch("/teams", auth, async (req, res) => {
  const { error } = validateTeams(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const teams = await getTeams(req.body.teams);
  if (teams.length !== req.body.teams.length)
    res.status(400).send("Teams numbers doesent match");

  let user = await User.findById(req.user._id);
  user.teams = req.body.teams;
  user = await user.save();
  res.send(user);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  //   check if need to add biz, cards, gamess....
  user = new User(_.pick(req.body, ["name", "email", "password", "teams"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

// router.put("/:id")

module.exports = router;
