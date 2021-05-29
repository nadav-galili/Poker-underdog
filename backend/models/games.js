const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  team_name: {
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

const Game = mongoose.model("Game", gameSchema);

function validateGame(game) {
  const schema = Joi.object({
    team_name: Joi.string().min(2).max(255).required(),
    players: Joi.array().required(),
  });
  return schema.validate(game);
}
exports.Game = Game;
exports.validate = validateGame;
