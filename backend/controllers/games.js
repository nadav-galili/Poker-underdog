// const Joi = require("@hapi/joi");

const _ = require("lodash");
const { Game, validate } = require("../models/games");
const mongoose = require("mongoose");
// const { Team } = require("../models/teams");

exports.totalGames = async function (req, res) {
  let tGames = await Game.aggregate([
    {
      $match: {
        team_id: req.params.teamId,
      },
    },
    {
      $count: "TotalGames",
    },
  ]);
  res.send(tGames);
};
exports.byTeamId = async function (req, res) {
  let games = await Game.find({
    team_id: req.params.teamId,
    // "players.name": { $not: /Nispach/ },
  }).sort({
    createdAt: -1,
  });
  res.send(games);
};

exports.teamStats = async function (req, res) {
  // const team = await Team.find({ _id: req.params.teamId });
  const table = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        team_id: req.params.teamId,
        "players.name": { $not: /Nispach/ },
      },
    },
    {
      $project: {
        players: 1,
        createdAt: 1,
        team_name: 1,
        team_id: 1,

        gamesWithPlus: {
          $cond: {
            if: {
              $gt: ["$players.profit", 0],
            },
            then: 1,
            else: 0,
          },
        },
      },
    },
    {
      $group: {
        _id: {
          name: "$players.name",
          image: "$players.image",
          player_id: "$players.id",
          team_id: "$team_id",
          team_name: "$team_name",
        },
        totalProfit: {
          $sum: "$players.profit",
        },
        avgProfit: {
          $avg: "$players.profit",
        },
        numOfGames: {
          $sum: 1,
        },
        avgCashing: {
          $avg: "$players.numOfCashing",
        },
        lastGame: {
          $max: "$createdAt",
        },
        gamesWithProfit: {
          $sum: "$gamesWithPlus",
        },
      },
    },
    {
      $setWindowFields: {
        partitionBy: "$players.name",
        sortBy: {
          totalProfit: -1,
        },
        output: {
          currentTableRank: {
            $rank: {},
          },
        },
      },
    },
    {
      $project: {
        successPercentage: {
          $round: [
            {
              $multiply: [
                {
                  $divide: ["$gamesWithProfit", "$numOfGames"],
                },
                100,
              ],
            },
            2,
          ],
        },

        players: 1,
        created_at: 1,
        team_name: 1,
        team_id: 1,
        gamesWithPlus: 1,
        totalProfit: 1,
        avgProfit: {
          $round: ["$avgProfit", 2],
        },
        numOfGames: 1,
        avgCashing: {
          $round: ["$avgCashing", 2],
        },
        lastGame: 1,
        gamesWithProfit: 1,
        currentTableRank: 1,
      },
    },
    {
      $sort: {
        totalProfit: -1,
      },
    },
  ]);
  res.send(table);
};

exports.successp = async function (req, res) {
  const success = await Game.aggregate([
    {
      $unwind: {
        path: "$players",

        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        team_id: req.params.teamId,
        "players.name": { $not: /Nispach/ },
      },
    },
    {
      $project: {
        players: 1,
        createdAt: 1,
        team_name: 1,
        team_id: 1,
        gamesWithProfit: {
          $cond: {
            if: { $gt: ["$players.profit", 0] },
            then: 1,
            else: 0,
          },
        },
      },
    },
    {
      $group: {
        _id: {
          name: "$players.name",
          image: "$players.image",
          player_id: "$players.id",
          team_id: "$team_id",
          team_name: "$team_name",
        },
        numOfGames: {
          $sum: 1,
        },

        gamesWithProfit: {
          $sum: "$gamesWithProfit",
        },
      },
    },
    {
      $project: {
        successPercentage: {
          $round: [
            {
              $multiply: [
                { $divide: ["$gamesWithProfit", "$numOfGames"] },
                100,
              ],
            },
            2,
          ],
        },

        players: 1,
        team_name: 1,
        team_id: 1,
      },
    },
    {
      $sort: {
        successPercentage: -1,
      },
    },
  ]);

  res.send(success);
};

exports.lastGame = async function (req, res) {
  const game = await Game.find({
    team_id: req.params.teamId,
    // "players.name": { $not: /Nispach/ },
  })
    .sort({
      updatedAt: -1,
    })
    .limit(1);
  res.send(game);
};

exports.profits = async function (req, res) {
  const profits = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        team_id: req.params.teamId,
        "players.name": { $not: /Nispach/ },
      },
    },
    {
      $sort: {
        "players.profit": -1,
      },
    },
    { $limit: 10 },
  ]);
  res.send(profits);
};

exports.allGames = async function (req, res) {
  const game = await Game.find({
    team_id: req.body.team_id,
    // "players.name": { $not: /Nispach/ },
  });
  res.send(game);
};
exports.gameById = async function (req, res) {
  const game = await Game.findById(req.params.gameId);
  res.send(game);
};
exports.dataByMonths = async function (req, res) {
  const byMonths = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        team_id: req.params.teamId,
        $expr: {
          $gte: [{ $month: "$createdAt" }, { $month: new Date() }],
        },
      },
    },
    {
      $group: {
        _id: {
          monthPlayed: { $month: "$createdAt" },
          name: "$players.name",
          image: "$players.image",
          player_id: "$players.id",
          team_id: "$team_id",
          team_name: "$team_name",
        },

        totalProfit: {
          $sum: "$players.profit",
        },
        avgProfit: {
          $avg: "$players.profit",
        },
        numOfGames: {
          $sum: 1,
        },
        avgCashing: {
          $avg: "$players.numOfCashing",
        },
        lastGame: {
          $max: "$createdAt",
        },
      },
    },
    {
      $sort: {
        totalProfit: -1,
      },
    },
  ]);
  res.send(byMonths);
};

exports.agg_profits = async function (req, res) {
  const agg = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        team_id: req.params.teamId,
        "players.name": { $not: /Nispach/ },
      },
    },
    {
      $sort: {
        "players.profit": -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $group: {
        _id: {
          name: "$players.name",
        },
        totalProfit: {
          $sum: "$players.profit",
        },
      },
    },
  ]);
  res.send(agg);
};

exports.personalStats = async function (req, res) {
  const agg = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        "players.id": req.params.uId,
        // "players.name":{$not:/Nispach/}
      },
    },
    {
      $project: {
        players: 1,
        createdAt: 1,
        team_name: 1,
        team_id: 1,
        gamesWithProfit: {
          $cond: {
            if: {
              $gt: ["$players.profit", 0],
            },
            then: 1,
            else: 0,
          },
        },
      },
    },
    {
      $group: {
        _id: {
          name: "$players.name",
          image: "$players.image",
          player_id: "$players.id",
        },
        totalProfit: {
          $sum: "$players.profit",
        },
        avgProfit: {
          $avg: "$players.profit",
        },
        numOfGames: {
          $sum: 1,
        },
        avgCashing: {
          $avg: "$players.numOfCashing",
        },
        avgGameRank: {
          $avg: "$players.gameRank",
        },
        gamesWithProfit: {
          $sum: "$gamesWithProfit",
        },
        lastGame: {
          $max: "$createdAt",
        },
        maxProfit: {
          $max: "$players.profit",
        },
        minProfit: {
          $min: "$players.profit",
        },
      },
    },
    {
      $project: {
        successPercentage: {
          $round: [
            {
              $multiply: [
                {
                  $divide: ["$gamesWithProfit", "$numOfGames"],
                },
                100,
              ],
            },
            2,
          ],
        },
        players: 1,
        team_name: 1,
        team_id: 1,
        numOfGames: 1,
        avgProfit: 1,
        totalProfit: 1,
        avgCashing: 1,
        avgGameRank: 1,
        gamesWithProfit: 1,
        lastGame: 1,
        maxProfit: 1,
        minProfit: 1,
      },
    },
  ]);

  res.send(agg);
};

//update game manager if a player takes control of game
exports.updateManager = async function (req, res) {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  let id = mongoose.Types.ObjectId(req.params.gameId);

  let game = await Game.findOneAndUpdate(
    { _id: id },
    { $set: { game_manager: req.body } },
    { returnNewDocument: true }
  );
  res.send(game);
};

exports.newGame = async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let game = new Game(
    _.pick(req.body, [
      "team_name",
      "team_id",
      "players",
      "isOpen",
      "game_manager",
      "cashing_details",
    ])
  );
  await game.save();
  res.send(_.pick(game, ["_id", "team_name", "players", "isOpen", "team_id"]));
};

exports.updateGame = async function (req, res) {
  let id = mongoose.Types.ObjectId(req.params.gameId);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let game = await Game.findOneAndUpdate(
    { _id: id },
    {
      players: req.body.players,
      isOpen: req.body.isOpen,
      cashing_details: req.body.cashing_details,
    },
    { new: true }
  );

  res.send(game);
};
exports.gamesByCardName = async function (req, res) {
  let cardTitle = req.params.cardName;
  cardTitle = "$" + cardTitle;
  let sortOrder;
  cardTitle === "$avgCashing" ? (sortOrder = 1) : (sortOrder = -1);
  const table = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        team_id: req.params.teamId,
        "players.name": { $not: /Nispach/ },
      },
    },
    {
      $project: {
        players: 1,
        createdAt: 1,
        team_name: 1,
        team_id: 1,
        gamesWithProfit: {
          $cond: {
            if: {
              $gt: ["$players.profit", 0],
            },
            then: 1,
            else: 0,
          },
        },
      },
    },
    {
      $group: {
        _id: {
          name: "$players.name",
          image: "$players.image",
          player_id: "$players.id",
          team_id: "$team_id",
          team_name: "$team_name",
        },
        totalProfit: {
          $sum: "$players.profit",
        },
        avgProfit: {
          $avg: "$players.profit",
        },
        numOfGames: {
          $sum: 1,
        },
        avgCashing: {
          $avg: "$players.numOfCashing",
        },
        lastGame: {
          $max: "$createdAt",
        },
        gamesWithProfit: {
          $sum: "$gamesWithProfit",
        },
      },
    },
    {
      $setWindowFields: {
        partitionBy: "$players.name",
        sortBy: {
          totalProfit: -1,
        },
        output: {
          currentTableRank: {
            $rank: {},
          },
        },
      },
    },
    {
      $project: {
        successPercentage: {
          $round: [
            {
              $multiply: [
                {
                  $divide: ["$gamesWithProfit", "$numOfGames"],
                },
                100,
              ],
            },
            2,
          ],
        },
        currentTableRank: 1,
        players: 1,
        team_name: 1,
        team_id: 1,

        cardTitle: { $round: [cardTitle, 2] },
      },
    },

    {
      $sort: {
        cardTitle: sortOrder,
      },
    },
  ]);

  res.send(table);
};
exports.previousRank = async function (req, res) {
  const table = await Game.aggregate([
    {
      $match: {
        team_id: req.params.teamId,
        "players.name": { $not: /Nispach/ },
      },
    },
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        players: 1,
        createdAt: 1,
        team_name: 1,
        team_id: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: 1,
    },
    {
      $group: {
        _id: {
          name: "$players.name",
          image: "$players.image",
          player_id: "$players.id",
          team_id: "$team_id",
          team_name: "$team_name",
        },
        totalProfit: {
          $sum: "$players.profit",
        },
        lastGame: {
          $max: "$createdAt",
        },
      },
    },
    {
      $setWindowFields: {
        partitionBy: "$players.name",
        sortBy: {
          totalProfit: -1,
        },
        output: {
          previousTableRank: {
            $rank: {},
          },
        },
      },
    },
  ]);

  res.send(table);
};
exports.gameInProgress = async function (req, res) {
  let progress = await Game.find({
    team_id: req.params.teamId,
    $or: [{ isOpen: true }, { isOpen: null }],
  });
  res.send(progress);
};

exports.totalCash = async function (req, res) {
  const total = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        team_id: req.params.teamId,
      },
    },
    {
      $project: {
        totalHours: {
          $divide: [
            {
              $subtract: ["$updatedAt", "$createdAt"],
            },
            3600000 * 6,
          ],
        },
        totalCashing: {
          $sum: "$players.cashing",
        },
      },
    },

    {
      $group: {
        _id: null,
        totalHours: {
          $sum: "$totalHours",
        },
        totalCashing: {
          $sum: "$totalCashing",
        },
      },
    },
  ]);
  res.send(total);
};

exports.personalGames = async function (req, res) {
  const details = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        "players.id": req.params.uId,
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
  ]);
  res.send(details);
};

exports.statsPerHour = async function (req, res) {
  const data = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        team_id: req.params.teamId,
        "players.name": { $not: /Nispach/ },
      },
    },
    {
      $project: {
        players: 1,
        createdAt: 1,
        updatedAt: 1,
        team_id: 1,
        team_name: 1,
        hoursPlayed: {
          $round: [
            {
              $divide: [
                {
                  $subtract: ["$updatedAt", "$createdAt"],
                },
                3600000,
              ],
            },
            2,
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          name: "$players.name",
          image: "$players.image",
          player_id: "$players.id",
          team_id: "$team_id",
          team_name: "$team_name",
        },
        totalProfit: {
          $sum: "$players.profit",
        },
        totalCashing: {
          $sum: "$players.cashing",
        },
        totalNumOfCashing: {
          $sum: "$players.numOfCashing",
        },
        hoursPlayed: {
          $sum: "$hoursPlayed",
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalProfit: 1,
        totalCashing: 1,
        totalNumOfCashing: 1,
        hoursPlayed: {
          $round: ["$hoursPlayed", 2],
        },
        profitPerHour: {
          $round: [
            {
              $divide: ["$totalProfit", "$hoursPlayed"],
            },
            2,
          ],
        },
        cashingPerHour: {
          $round: [
            {
              $divide: ["$totalCashing", "$hoursPlayed"],
            },
            2,
          ],
        },
        nuOfCashingPerHour: {
          $round: [
            {
              $divide: ["$totalNumOfCashing", "$hoursPlayed"],
            },
            2,
          ],
        },
      },
    },
    {
      $sort: {
        profitPerHour: -1,
      },
    },
  ]);

  res.send(data);
};

exports.fetchCashingDetails = async function (req, res) {
  let data = await Game.findById(req.params.gameId);
  data = data.cashing_details;
  data = data.reverse();
  res.send(data);
};

exports.monthlyStats = async function (req, res) {
  let currMonth = new Date().getMonth();

  const byMonths = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        team_id: req.params.teamId,
      },
    },
    {
      $group: {
        _id: {
          monthPlayed: { $month: "$createdAt" },
          name: "$players.name",
          image: "$players.image",
          player_id: "$players.id",
          team_id: "$team_id",
          team_name: "$team_name",
        },

        totalProfit: {
          $sum: "$players.profit",
        },
        avgProfit: {
          $avg: "$players.profit",
        },
        numOfGames: {
          $sum: 1,
        },
        avgCashing: {
          $avg: "$players.numOfCashing",
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalProfit: 1,
        roundedAvgProfit: { $round: ["$avgProfit", 2] },
        numOfGames: 1,
        roundedAvgCashing: { $round: ["$avgCashing", 2] },
      },
    },
    {
      $sort: {
        _id: 1,
        totalProfit: -1,
      },
    },
  ]);
  res.send(byMonths);
};
