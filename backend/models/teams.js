const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 255,
  },
  players: {
    type: Array,
    required: true,
  },
  teamImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024,
  },
  teamNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Team = mongoose.model("Team", teamSchema);

function validateTeam(team) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    players: Joi.array().required(),
    teamImage: Joi.string().min(11).max(1025),
  });
  return schema.validate(team);
}

async function generateTeamNumber(Team) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let team = await Team.findOne({ teamNumber: randomNumber });
    if (!team) return String(randomNumber);
  }
}
exports.Team = Team;
exports.validateTeam = validateTeam;
exports.generateTeamNumber = generateTeamNumber;
