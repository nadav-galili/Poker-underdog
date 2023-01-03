// const { Game, validate } = require("../models/games");
// const { Team } = require("../models/teams");
// const { User } = require("../models/user");
const { SideBet, validate } = require("../models/sideBets");
const mongoose = require("mongoose");
// const {
//   default: MasterPlayer,
// } = require("../../src/components/sidebets/masterPlayer");

exports.newSideBet = async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let sideBet = new SideBet({
    masterPlayer: req.body.masterPlayer,
    slavePlayer: req.body.slavePlayer,
    sideBetSum: req.body.sideBetSum,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    teamId: req.body.teamId,
    approvedBySlavePlayer: req.body.approvedBySlavePlayer,
  });
  await sideBet.save();
  res.send(sideBet);
};

exports.getSideBetsForTeam = async function (req, res) {
  const teamId = req.params.teamId;
  const sideBets = await SideBet.find({
    teamId: mongoose.Types.ObjectId(teamId),
  });
  res.send(sideBets);
};

exports.getsidebetsForMainTable = async function (req, res) {
  const teamId = req.params.teamId;
  const sideBets = await SideBet.find({
    teamId: mongoose.Types.ObjectId(teamId),
    approvedBySlavePlayer: false,
  });
  res.send(sideBets);
};
