const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    __v: {
      type: String,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    gameId: {
      type: String,
    },
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
      type: Array,
      required: true,
    },
    game_manager: {
      type: Object,
      required: true,
    },
    cashing_details: {
      type: Array,
      required: true,
    },
    scheduledGame: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ScheduleGames", //reference to the ScheduleGames collection
    },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

function validateGame(game) {
  const schema = Joi.object({
    __v: Joi.string(),
    team_name: Joi.string().min(2).max(255).required(),
    team_id: Joi.string().min(24).max(24).required(),
    players: Joi.array().required(),
    isOpen: Joi.boolean(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    gameId: Joi.string(),
    game_manager: Joi.object(),
    cashing_details: Joi.array(),
    scheduledGame: Joi.string(),
  });
  return schema.validate(game);
}
exports.Game = Game;
exports.validate = validateGame;
