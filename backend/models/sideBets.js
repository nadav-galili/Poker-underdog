const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const sidebetSchema = new mongoose.Schema(
  {
    masterPlayer: {
      type: Object,
      required: true,
    },
    slavePlayer: {
      type: Object,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    sideBetSum: {
      type: Number,
      required: true,
    },
    approvedBySlavePlayer: {
      type: Boolean,
      required: false,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  { timestamps: true }
);

const SideBet = mongoose.model("SideBet", sidebetSchema);

function validateSideBet(game) {
  const schema = Joi.object({
    masterPlayer: Joi.object().required(),
    slavePlayer: Joi.object().required(),
    sideBetSum: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    teamId: Joi.string().required(),
    approvedBySlavePlayer: Joi.boolean().required(),
  });
  return schema.validate(game);
}
exports.SideBet = SideBet;
exports.validate = validateSideBet;
