const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const gameSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 255,
  },
  team_id: {
    type: String,
    required: true,
    minlength: 24,
    maxlength: 24,
  },
  players: {
    type:Array,
    minlength:2
  }
},
{ timestamps: true });

const Game = mongoose.model("Game", gameSchema);

function validateGame(game) {
  const schema = Joi.object({
    team_name: Joi.string().min(2).max(255).required(),
    team_id: Joi.string().min(24).max(24).required(),
    players: Joi.array().required(),
  });
  return schema.validate(game);
}
exports.Game = Game;
exports.validate = validateGame;
