const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  players: {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cashing: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model("Game", gameSchema);

function validateGame(game) {
  const schema = Joi.object({
    players: {
      cashing: Joi.number().required(),
      profit: Joi.number().required(),
      rank: Joi.number().required(),
    },
  });

  return schema.validate(game);
}

exports.Game = Game;
exports.validateGame = validateGame;
