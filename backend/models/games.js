const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  group: {
    type: String,
  },
  players: {
    type: Array,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

//   createdAt: { type: Date, default: Date.now },
// });

const Game = mongoose.model("Game", gameSchema);

// function validateGame(game) {
//   const schema = Joi.object({
//     players_list: Joi.array().items(
//       Joi.Number(),
//       Joi.Mongoose.Schema.Types.ObjectId()
//     ),
//   });

//   return schema.validate(game);
// }
exports.Game = Game;

// module.exports = mongoose.model("game", gameSchema);
