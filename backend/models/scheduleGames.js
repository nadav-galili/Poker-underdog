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
    host: {
      type: Object,
      required: true,
    },

    guests: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const ScheduleGames = mongoose.model("ScheduleGames", scheduleGamesSchema);

function validateScheduleGames(game) {
  const schema = Joi.object({
    gameDate: Joi.date().required(),
    teamId: Joi.string().required(),
    teamName: Joi.string().required(),
    hostId: Joi.string().required(),
    guests: Joi.array().required(),
  });
  return schema.validate(game);
}
exports.ScheduleGames = ScheduleGames;
exports.validate = validateScheduleGames;
