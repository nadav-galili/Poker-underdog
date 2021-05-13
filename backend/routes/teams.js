const express = require("express");
const _ = require("lodash");
const { Team, validateTeam, generateTeamNumber } = require("../models/teams");
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
  const { error } = validateTeam(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let team = new Team({
    name: req.body.name,
    players: req.body.players,
    teamImage: req.body.teamImage
      ? req.body.teamImage
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    teamNumber: await generateTeamNumber(Team),
    user_id: req.user._id,
  });

  let post = await team.save();
  res.send(post);

  // let team = await Team.findOne({ name: req.body.name });
  // if (team) return res.status(400).send("Team already registered");
  // team = new Team(_.pick(req.body, ["name", "players"]));
  // const randomNumber = await generateTeamNumber(Team);
  // await team.save();
  // res.send(_.pick(team, ["_id", "name", "players"]), randomNumber);
});

//edit a specific team
router.put("/:teamId", auth, async (req, res) => {
  const { error } = validateTeam(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let team = await Team.findOneAndUpdate(
    { _id: req.params.teamId, user_id: req.user._id },
    req.body
  );
  if (!team)
    return res.status(404).send("The team with the given Id was not found");

  team = await Team.findOne({ _id: req.params.teamId, user_id: req.user._id });
  res.send(team);
});

//delete a team
router.delete("/:teamId", auth, async (req, res) => {
  const team = await Team.findOneAndRemove({
    _id: req.params.teamId,
    user_id: req.user._id,
  });
  if (!team)
    return res.status(404).send("The team with the given ID was not found");
  res.send(team);
});

module.exports = router;
