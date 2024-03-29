const express = require("express");
const upload = require("../middleware/upload");
const { User } = require("../models/user");
const teamsController = require("../controllers/teams");
const auth = require("../middleware/auth");
const router = express.Router();

const {
  Team,
  validateTeam,
  validateTeamWithId,
  generateTeamNumber,
} = require("../models/teams");

//get all the teams of a specific user
router.get("/my-teams", auth, async (req, res) => {
  const teams = await Team.find({ "players._id": req.user._id });
  res.send(teams);
});

router.get(
  "/teamForSideBets/:teamId/:userId",
  auth,
  teamsController.getTeamForSideBets
);
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
router.post("/", upload.single("image"), auth, async (req, res) => {
  const { error } = validateTeam(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // if (error) console.log(error.details[0].message);

  const player = await User.find({ _id: req.user._id })
    .select("-createdAt")
    .select("-__v")
    .select("-password");
  // .select("-_id");

  let teamPlayer = {};
  teamPlayer._id = player[0]._id.valueOf().toString();
  teamPlayer.nickName = player[0].nickName;
  teamPlayer.image = player[0].image;
  teamPlayer.teams = player[0].teams;

  let team = new Team({
    name: req.body.name,
    players: teamPlayer,
    teamImage: req.file ? req.file.path : "uploads/poker.png",
    teamNumber: await generateTeamNumber(Team),
    user_id: req.user._id,
  });
  let post = await team.save();

  player[0].teams.push(post._id.valueOf().toString());
  const p = await User.findOneAndUpdate({ _id: req.user._id }, player[0]);

  res.send(post);
});

//edit a specific team by id
router.put("/:teamId", auth, async (req, res) => {
  const { error } = validateTeamWithId(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  let team = await Team.findOneAndUpdate({ _id: req.params.teamId }, req.body);
  if (!team)
    return res.status(404).send("The team with the given Id was not found");
  team = await Team.findOne({ _id: req.params.teamId });
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

router.delete(
  "/removePlayerFromTeam/:teamNumber/:playerId",
  auth,
  teamsController.deletePlayerFromTeam
);

//new ROUTES ////********
////***** */ * /

router.get("/newGetTeam/:teamId", auth, teamsController.newGetTeam);

module.exports = router;
