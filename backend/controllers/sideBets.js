const { Game } = require("../models/games");
const { SideBet, validate } = require("../models/sideBets");
const mongoose = require("mongoose");
const { ContactsOutlined } = require("@material-ui/icons");

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
    "slavePlayer.dissmissDate": { $eq: null },
  });
  res.send(sideBets);
};

exports.gotOfferedSidebet = async function (req, res) {
  const userId = req.params.userId;
  const sideBets = await SideBet.find({
    "slavePlayer._id": userId,
    approvedBySlavePlayer: false,
    "slavePlayer.dissmissDate": { $eq: null },
  });
  res.send(sideBets);
};

exports.acceptSideBet = async function (req, res) {
  const sideBetId = mongoose.Types.ObjectId(req.params.sideBetId);
  const sideBet = await SideBet.findOneAndUpdate(
    { _id: sideBetId },
    {
      $set: {
        approvedBySlavePlayer: true,
        "slavePlayer.approvedDate": new Date(),
      },
    },
    { new: true }
  );
  res.send(sideBet);
};

exports.dismissSideBet = async function (req, res) {
  const sideBetId = mongoose.Types.ObjectId(req.params.sideBetId);
  const sideBet = await SideBet.findOneAndUpdate(
    { _id: sideBetId },
    {
      $set: {
        approvedBySlavePlayer: false,
        "slavePlayer.dissmissDate": new Date(),
      },
    },
    { new: true }
  );
  res.send(sideBet);
};

exports.getAllApprovedSideBets = async (req, res) => {
  const teamId = mongoose.Types.ObjectId(req.params.teamId);
  let sideBets = await SideBet.find({
    teamId: mongoose.Types.ObjectId(teamId),
    approvedBySlavePlayer: true,
  });

  res.send(sideBets);
};

exports.getExtraDetais = async (req, res) => {
  const teamId = req.body.teamId;
  const sideBetMAsterPlayerId = req.body.sideBetMasterPlayerId;
  const sideBetSlavePlayerId = req.body.sideBetsSlavePlayerId;
  const startDate = req.body.sideBetStartDate;
  const endDate = req.body.sideBetEndDate;

  const getExtraDetail = await Game.aggregate([
    {
      $match: {
        team_id: teamId,
      },
    },
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        $and: [
          {
            $or: [
              {
                "players.id": sideBetMAsterPlayerId,
              },
              {
                "players.id": sideBetSlavePlayerId,
              },
            ],
          },
          {
            $and: [
              {
                createdAt: {
                  $gte: new Date(startDate),
                },
              },
              {
                updatedAt: {
                  $lte: new Date(endDate),
                },
              },
            ],
          },
        ],
      },
    },
    {
      $group: {
        _id: {
          playerId: "$players.id",
          playerName: "$players.name",
          playerImage: "$players.image",
          team_id: "$team_id",
        },
        totalProfit: {
          $sum: "$players.profit",
        },
        totalCashing: {
          $sum: "$players.cashing",
        },
        totalGames: {
          $sum: 1,
        },
        avgProfit: {
          $avg: "$players.profit",
        },
        lastGame: {
          $max: "$updatedAt",
        },
      },
    },
  ]);

  res.send(getExtraDetail);
};
