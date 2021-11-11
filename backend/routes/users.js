const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateUserWithId } = require("../models/user");
const auth = require("../middleware/auth");
const upload=require("../middleware/upload");
const { Team } = require("../models/teams");
const router = express.Router();
// const { Game } = require("../models/games");


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
// router.patch("/teams", auth, async (req, res) => {
//   const { error } = validateTeams(req.body);
//   if (error) res.status(400).send(error.details[0].message);

//   const teams = await getTeams(req.body.teams);
//   if (teams.length !== req.body.teams.length)
//     res.status(400).send("Teams numbers doesent match");

//   let user = await User.findById(req.user._id);
//   user.teams = req.body.teams;
//   user = await user.save();
//   res.send(user);
// });

router.get("/me", auth, async (req, res) => {
  let user = await User.findById(req.user._id)
    .select("-createdAt")
    .select("-__v");

  res.send(user);
});

router.post("/",upload.single('image'),  async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // if (error) console.log(error.details[0].message);
  var user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");
  const {file}=req;
 


  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nickName: req.body.nickName,
    email: req.body.email,
    image: req.file? req.file.path:
     "uploads/user.png",
    password: req.body.password,
    teams: [],
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(_.pick(user, ["_id", "FirstName","lastName","nickName", "email", "image"]));
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateUserWithId(req.body);
   if (error) return res.status(400).send(error.details[0].message);
  // if (error) console.log(error.details[0].message);
  let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  user = await User.findOne({ _id: req.params.id, user_id: req.user.id });
  res.send(user);
});

module.exports = router;
