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
  console.log("req", req.body);
  let sideBet = new SideBet({
    masterPlayer: req.body.masterPlayer,
    slavePlayer: req.body.slavePlayer,
    sideBetSum: req.body.sideBetSum,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    teamId: req.body.teamId,
  });
  console.log("🚀 ~ file: sideBets.js:22 ~ sideBet", sideBet);
  await sideBet.save();
  res.send(sideBet);
};
