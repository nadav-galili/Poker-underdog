const express = require("express");
// const _ = require("lodash");
const {
  Team,
  validateTeam,
  validateTeamWithId,
  generateTeamNumber,
} = require("../models/teams");
const auth = require("../middleware/auth");
const router = express.Router();

//get all the teams of a specific user
router.get("/my-teams", auth, async (req, res) => {
  const teams = await Team.find({ "players._id": req.user._id });
  res.send(teams);
});

//get by number
router.get("/numbers/:teamNumber", auth, async (req, res) => {
  let teams = await Team.findOne({ teamNumber: req.params.teamNumber })
    .select("-created_at")
    .select("-__v")
    .select("-teamNumber");
  // .select("-user_id");
  if (!teams) return res.status(400).send("No teams found with this number");
  res.send(teams);
});

// specific team
router.get("/:teamId", auth, async (req, res) => {
  const team = await Team.findById(req.params.teamId);
  res.send(team);
});

// gets back all the teams
router.get("/", auth, async (req, res) => {
  const teams = await Team.find({ user_id: req.user._id });
  res.send(teams);
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
      : "https://cdn.pixabay.com/photo/2013/07/13/10/42/casino-157595_960_720.png",
    teamNumber: await generateTeamNumber(Team),
    user_id: req.user._id,
  });

  let post = await team.save();
  res.send(post);
});

//edit a specific team by id
router.put("/:teamId", auth, async (req, res) => {
  const { error } = validateTeamWithId(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let team = await Team.findOneAndUpdate({ _id: req.params.teamId }, req.body);
  console.log(team);
  if (!team)
    return res.status(404).send("The team with the given Id was not found");

  team = await Team.findOne({ _id: req.params.teamId });
  console.log(team);
  res.send(team);
});

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
