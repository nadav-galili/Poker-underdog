const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const scheduleGamesSchema = new mongoose.Schema(
  {
    gameDate: {
      type: Date,
      required: true,
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    teamName: {
      type: String,
      required: true,
    },
    hostId: {
      type: String,
      required: true,
    },
    hostName: {
      type: String,
    },
    guests: {
      type: Array,
    },
  },
  { timestamps: true }
);

const scheduleGames = mongoose.model("scheduleGames", scheduleGamesSchema);

function validateScheduleGames(game) {
  const schema = Joi.object({
    gameDate: Joi.date().required(),
    teamId: Joi.string().required(),
    teamName: Joi.string().required(),
    hostId: Joi.string().required(),
    hostName: Joi.string(),
    guests: Joi.array(),
  });
  return schema.validate(game);
}
exports.scheduleGames = scheduleGames;
exports.validate = validateScheduleGames;
