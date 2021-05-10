const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

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
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Team = mongoose.model("Team", teamSchema);

function validateTeam(team) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    players: Joi.array().required(),
  });
  return schema.validate(team);
}

exports.Team = Team;
exports.validate = validateTeam;
