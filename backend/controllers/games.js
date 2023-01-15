// const Joi = require("@hapi/joi");

const _ = require("lodash");
const { Game, validate } = require("../models/games");
const mongoose = require("mongoose");
// const { Team } = require("../models/teams");
let currentYear = new Date(new Date().getFullYear(), 0, 1);

exports.totalGames = async function (req, res) {
  let Games = await Game.aggregate([
    {
      $match: {
        team_id: req.params.teamId,
        createdAt: {
          $gte: currentYear,
        },
      },
    },
    {
      $count: "TotalGames",
    },
  ]);
  res.send(Games);
};
exports.byTeamId = async function (req, res) {
  let games = await Game.find({
    team_id: req.params.teamId,
    createdAt: {
      $gte: currentYear,
    },
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
        createdAt: {
          $gte: currentYear,
        },
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
                { $cond: [{ $eq: ["$numOfGames", 0] }, 0, 1] },
                { $divide: ["$gamesWithProfit", "$numOfGames"] },
                100,
              ],
              //     $divide: ["$gamesWithProfit", "$numOfGames"],
              //   },
              //   100,
              // ],
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
        createdAt: {
          $gte: currentYear,
        },
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
                { $cond: [{ $eq: ["$numOfGames", 0] }, 0, 1] },
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
    createdAt: {
      $gte: currentYear,
    },
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
        createdAt: {
          $gte: currentYear,
        },
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
    createdAt: {
      $gte: currentYear,
    },
    // "players.name": { $not: /Nispach/ },
  });
  res.send(game);
};
exports.gameById = async function (req, res) {
  const game = await Game.findById(req.params.gameId);
  res.send(game);
};
exports.dataByMonths = async function (req, res) {
  let month = parseInt(req.params.month);
  // let month = new Date().getMonth() + 1;
  // console.log("🚀 ~ file: games.js:301 ~ month", month);
  // console.log("month", new Date().getMonth());

  const byMonths = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        createdAt: {
          $gte: currentYear,
        },
        team_id: req.params.teamId,
        $expr: {
          $eq: [
            {
              $month: "$createdAt",
            },
            month,
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          monthPlayed: {
            $month: "$createdAt",
          },
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
        createdAt: {
          $gte: currentYear,
        },
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
        createdAt: {
          $gte: currentYear,
        },
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
                  $cond: {
                    if: {
                      $eq: ["$numOfGames", 0],
                    },
                    then: 0,
                    else: {
                      $divide: ["$gamesWithProfit", "$numOfGames"],
                    },
                  },
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
        createdAt: {
          $gte: currentYear,
        },
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
                  $cond: {
                    if: {
                      $eq: ["$numOfGames", 0],
                    },
                    then: 0,
                    else: {
                      $divide: ["$gamesWithProfit", "$numOfGames"],
                    },
                  },
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
        createdAt: {
          $gte: currentYear,
        },
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
        createdAt: {
          $gte: currentYear,
        },
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
        createdAt: {
          $gte: currentYear,
        },
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
        createdAt: {
          $gte: currentYear,
        },
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
              $cond: [
                {
                  $eq: ["$hoursPlayed", 0],
                },
                0,
                {
                  $divide: ["$totalProfit", "$hoursPlayed"],
                },
              ],
            },

            2,
          ],
        },
        cashingPerHour: {
          $round: [
            {
              $cond: [
                {
                  $eq: ["$hoursPlayed", 0],
                },
                0,
                {
                  $divide: ["$totalCashing", "$hoursPlayed"],
                },
              ],
            },

            2,
          ],
        },
        nuOfCashingPerHour: {
          $round: [
            {
              $cond: [
                {
                  $eq: ["$hoursPlayed", 0],
                },
                0,
                {
                  $divide: ["$totalNumOfCashing", "$hoursPlayed"],
                },
              ],
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
        createdAt: {
          $gte: currentYear,
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

exports.monthlyByPlayer = async function (req, res) {
  const monthlyByPlayer = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        team_id: req.params.teamid,
        createdAt: {
          $gte: currentYear,
        },
      },
    },
    {
      $group: {
        _id: {
          monthPlayed: {
            $month: "$createdAt",
          },
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
        roundedAvgProfit: {
          $round: ["$avgProfit", 2],
        },
        numOfGames: 1,
        roundedAvgCashing: {
          $round: ["$avgCashing", 2],
        },
      },
    },
    {
      $sort: {
        "_id.name": 1,
        "_id.monthPlayed": 1,
      },
    },
  ]);

  let players = _.groupBy(monthlyByPlayer, "_id.name");
  players = Object.entries(players);
  for (let i = 0; i < players.length; i++) {
    players[i][2] = [];
    for (let j = 0; j < players[i][1].length; j++) {
      players[i][2].push(players[i][1][j].totalProfit);
    }
  }

  res.send(players);
};

exports.sideBets = async function (req, res) {
  const agg = await Game.aggregate([
    {
      $match: {
        team_id: req.params.teamId,
        createdAt: {
          $gte: new Date("27 May 2022 00:00:00 GMT"),
        },
      },
    },
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        $or: [
          {
            "players.id": "61c440e7fef3431fa3c7b06a",
          },
          {
            "players.id": "61d17080f6969223bab8acaf",
          },
        ],
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
        profit: {
          $sum: "$players.profit",
        },
        numOfGames: {
          $sum: 1,
        },
        avgProfit: {
          $avg: "$players.profit",
        },
      },
    },
  ]);
  res.send(agg);
};

///NEW CONTROLELERS
///*********** * /
exports.totalStatsForTeam = async function (req, res) {
  const teamId = req.params.teamId;
  const teamStats = await Game.aggregate([
    {
      $match: {
        team_id: teamId,
        createdAt: {
          $gte: currentYear,
        },
      },
    },
    {
      $project: {
        team_name: 1,
        createdAt: 1,
        team_id: 1,
        totalHoursPlayed: {
          $divide: [
            {
              $subtract: ["$updatedAt", "$createdAt"],
            },
            60 * 60 * 1000,
          ],
        },
        totalCashing: {
          $sum: "$players.cashing",
        },
      },
    },
    {
      $group: {
        _id: {
          teamName: "$team_name",
          teamId: "$team_id",
        },
        totalGames: {
          $sum: 1,
        },
        totalHoursPlayed: {
          $sum: "$totalHoursPlayed",
        },
        totalCashing: {
          $sum: "$totalCashing",
        },
        lastGamePlayed: {
          $max: "$createdAt",
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalGames: 1,
        totalHoursPlayed: {
          $round: ["$totalHoursPlayed", 2],
        },
        totalCashing: 1,
        lastGamePlayed: {
          $dateToString: {
            format: "%d-%m-%Y",
            date: "$lastGamePlayed",
          },
        },
      },
    },
  ]);
  res.send(teamStats);
};

exports.profitsStats = async function (req, res) {
  const teamId = req.params.teamId;
  const stats = await Game.aggregate([
    {
      $match: {
        team_id: teamId,
        createdAt: {
          $gt: new Date(currentYear),
        },
      },
    },
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $project: {
        players: 1,
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
          id: "$players.id",
          image: "$players.image",
        },
        totalProfit: {
          $sum: "$players.profit",
        },
        totalGames: {
          $sum: 1,
        },
        gamesWithPlus: {
          $sum: "$gamesWithPlus",
        },
        avgProfit: {
          $avg: "$players.profit",
        },
        avgCashing: {
          $avg: "$players.cashing",
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalProfit: 1,
        totalGames: 1,
        gamesWithPlus: 1,
        avgProfit: {
          $round: ["$avgProfit", 2],
        },
        avgCashing: {
          $round: ["$avgCashing", 2],
        },
      },
    },
    {
      $sort: {
        totalProfit: -1,
      },
    },
  ]);
  res.send(stats);
};

exports.topTenProfits = async function (req, res) {
  const teamId = req.params.teamId;
  const topTen = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        team_id: teamId,
        createdAt: {
          $gt: new Date(currentYear),
        },
        "players.profit": {
          $gt: 0,
        },
      },
    },
    {
      $project: {
        _id: {
          id: "$players.id",
          name: "$players.name",
          image: "$players.image",
        },
        profit: "$players.profit",
        date: {
          $dateToString: {
            format: "%d-%m",
            date: "$createdAt",
          },
        },
        cashInHand: "$players.cashInHand",
        cashing: "$players.cashing",
      },
    },
    {
      $sort: {
        profit: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);
  res.send(topTen);
};

exports.getHourlyStats = async function (req, res) {
  const teamId = req.params.teamId;
  const getHourlydata = await Game.aggregate([
    {
      $match: {
        team_id: teamId,
        createdAt: {
          $gte: new Date(currentYear),
        },
      },
    },
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $project: {
        players: 1,
        createdAt: 1,
        updatedAt: 1,
        playerCashOutTime: {
          $ifNull: ["$players.cashOutTime", "$updatedAt"],
        },
        team_id: 1,
        team_name: 1,
      },
    },
    {
      $addFields: {
        playerCashOutTime: {
          $toDate: "$playerCashOutTime",
        },
      },
    },
    {
      $project: {
        players: 1,
        createdAt: 1,
        updatedAt: 1,
        hoursPlayed: {
          $round: [
            {
              $divide: [
                {
                  $subtract: ["$playerCashOutTime", "$createdAt"],
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
          id: "$players.id",
          name: "$players.name",
          image: "$players.image",
        },
        totalProfit: {
          $sum: "$players.profit",
        },
        hoursPlayed: {
          $sum: "$hoursPlayed",
        },
        totalCashing: {
          $sum: "$players.cashing",
        },
        totalNumOfCashing: {
          $sum: "$players.numOfCashing",
        },
        totalGames: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalProfit: 1,
        totalCashing: 1,
        totalNumOfCashing: 1,
        totalGames: 1,
        hoursPlayed: {
          $round: ["$hoursPlayed", 2],
        },
        profitPerHour: {
          $round: [
            {
              $cond: [
                {
                  $eq: ["$hoursPlayed", 0],
                },
                0,
                {
                  $divide: ["$totalProfit", "$hoursPlayed"],
                },
              ],
            },
            2,
          ],
        },
        cashingPerHour: {
          $round: [
            {
              $cond: [
                {
                  $eq: ["$hoursPlayed", 0],
                },
                0,
                {
                  $divide: ["$totalCashing", "$hoursPlayed"],
                },
              ],
            },
            2,
          ],
        },
        numOfCashingPerHour: {
          $round: [
            {
              $cond: [
                {
                  $eq: ["$hoursPlayed", 0],
                },
                0,
                {
                  $divide: ["$totalNumOfCashing", "$hoursPlayed"],
                },
              ],
            },
            2,
          ],
        },
        avgHourPerGame: {
          $round: [
            {
              $divide: ["$hoursPlayed", "$totalGames"],
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
  res.send(getHourlydata);
};

exports.getStatsByMonth = async function (req, res) {
  const teamId = req.params.teamId;
  const getStatsByMonth = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        team_id: teamId,
        $expr: {
          $and: [
            {
              $eq: [
                {
                  $year: "$createdAt",
                },
                {
                  $year: new Date(),
                },
              ],
            },
            {
              $eq: [
                {
                  $month: "$createdAt",
                },
                {
                  $month: new Date(),
                },
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          monthPlayed: {
            $month: "$createdAt",
          },
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
        roundedAvgProfit: {
          $round: ["$avgProfit", 2],
        },
        numOfGames: 1,
        roundedAvgCashing: {
          $round: ["$avgCashing", 2],
        },
      },
    },
    {
      $sort: {
        "_id.monthPlayed": 1,
        totalProfit: -1,
        "_id.name": 1,
      },
    },
  ]);
  res.send(getStatsByMonth);
};

exports.getTopComebacks = async function (req, res) {
  const teamId = req.params.teamId;
  const getTopComebacks = await Game.aggregate([
    {
      $match: {
        team_id: teamId,
        createdAt: {
          $gte: new Date(currentYear),
        },
      },
    },
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        "players.profit": {
          $gte: 0,
        },
      },
    },
    {
      $project: {
        _id: {
          id: "$players.id",
          name: "$players.name",
          image: "$players.image",
        },
        profit: "$players.profit",
        date: {
          $dateToString: {
            format: "%d-%m",
            date: "$createdAt",
          },
        },
        cashInHand: "$players.cashInHand",
        cashing: "$players.cashing",
      },
    },
    {
      $sort: {
        cashing: -1,
        profit: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);
  res.send(getTopComebacks);
};

exports.getWiningStreak = async function (req, res) {
  const teamId = req.params.teamId;
  const getWiningStreaks = await Game.aggregate([
    {
      $match: {
        team_id: teamId,
        createdAt: {
          $gte: new Date(currentYear),
        },
      },
    },
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $project: {
        "players.name": 1,
        "players.id": 1,
        "players.image": 1,
        "players.profit": 1,
        gamesWithPlus: {
          $cond: {
            if: {
              $gt: ["$players.profit", 0],
            },
            then: 1,
            else: 0,
          },
        },
        createdAt: 1,
      },
    },
    {
      $group: {
        _id: {
          id: "$players.id",
          name: "$players.name",
          image: "$players.image",
        },
        numOfGames: {
          $sum: 1,
        },
        gamesWithProfit: {
          $sum: "$gamesWithPlus",
        },
        streaks: {
          $push: {
            max: 0,
            curr: 0,
            gid: "$_id",
            s: "$players.profit",
          },
        },
      },
    },
    {
      $project: {
        "players.name": 1,
        "players.id": 1,
        "players.profit": 1,
        "players.image": 1,
        successPercentage: {
          $round: [
            {
              $multiply: [
                {
                  $cond: [
                    {
                      $eq: ["$numOfGames", 0],
                    },
                    0,
                    1,
                  ],
                },
                {
                  $divide: ["$gamesWithProfit", "$numOfGames"],
                },
                100,
              ],
            },
            2,
          ],
        },
        won: {
          $size: {
            $filter: {
              input: "$streaks",
              as: "zz",
              cond: {
                $gt: ["$$zz.s", 0],
              },
            },
          },
        },
        lost: {
          $size: {
            $filter: {
              cond: {
                $lt: ["$$zz.s", 0],
              },
              input: "$streaks",
              as: "zz",
            },
          },
        },
        winStreak: {
          $reduce: {
            input: "$streaks",
            initialValue: {
              max: 0,
              curr: 0,
              gid: 0,
            },
            in: {
              $cond: {
                if: {
                  $gt: ["$$this.s", 0],
                },
                then: {
                  $cond: {
                    then: {
                      gid: "$$this.gid",
                      max: {
                        $add: ["$$value.max", 1],
                      },
                      curr: {
                        $add: ["$$value.curr", 1],
                      },
                    },
                    else: {
                      gid: "$$value.gid",
                      max: "$$value.max",
                      curr: {
                        $add: ["$$value.curr", 1],
                      },
                    },
                    if: {
                      $eq: ["$$value.max", "$$value.curr"],
                    },
                  },
                },
                else: {
                  curr: 0,
                  gid: "$$value.gid",
                  max: "$$value.max",
                },
              },
            },
          },
        },
        loseStreak: {
          $reduce: {
            input: "$streaks",
            initialValue: {
              gid: 0,
              max: 0,
              curr: 0,
            },
            in: {
              $cond: {
                if: {
                  $lt: ["$$this.s", 0],
                },
                then: {
                  $cond: {
                    else: {
                      gid: "$$value.gid",
                      max: "$$value.max",
                      curr: {
                        $add: ["$$value.curr", 1],
                      },
                    },
                    if: {
                      $eq: ["$$value.max", "$$value.curr"],
                    },
                    then: {
                      gid: "$$this.gid",
                      max: {
                        $add: ["$$value.max", 1],
                      },
                      curr: {
                        $add: ["$$value.curr", 1],
                      },
                    },
                  },
                },
                else: {
                  gid: "$$value.gid",
                  max: "$$value.max",
                  curr: 0,
                },
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        maxWinStreak: {
          $sum: "$winStreak.max",
        },
        currWinStreak: {
          $sum: "$winStreak.curr",
        },
        lossStreakMax: {
          $sum: "$loseStreak.max",
        },
      },
    },
    {
      $project: {
        winStreak: 0,
        loseStreak: 0,
      },
    },
    {
      $sort: {
        maxWinStreak: -1,
      },
    },
  ]);
  res.send(getWiningStreaks);
};

exports.getAllMonthsByMonth = async function (req, res) {
  const teamId = req.params.teamId;
  const thisMonth = new Date().getMonth() + 1;
  // console.log("🚀 ~ file: games.js:1882 ~ thisMonth", thisMonth);
  let wholeYear = [];
  for (let i = 1; i <= thisMonth; i++) {
    let getMonths = await Game.aggregate([
      [
        {
          $unwind: {
            path: "$players",
          },
        },
        {
          $match: {
            team_id: teamId,
            createdAt: {
              $gte: new Date(currentYear),
            },
            // $and: [
            //   {
            //     createdAt: {
            //       $gte: new Date("2022"),
            //     },
            //   },
            //   {
            //     createdAt: {
            //       $lt: new Date("2023"),
            //     },
            //   },
            // ],
          },
        },
        {
          $project: {
            monthPlayed: {
              $month: "$createdAt",
            },
            "players.name": 1,
            "players.id": 1,
            "players.image": 1,
            "players.profit": 1,
            "players.cashing": 1,
            "players.numOfCashing": 1,
          },
        },
        {
          $match: {
            monthPlayed: thisMonth,
          },
        },
        {
          $group: {
            _id: {
              id: "$players.id",
              name: "$players.name",
              image: "$players.image",
            },
            totalProfit: {
              $sum: "$players.profit",
            },
            avgCashing: {
              $avg: "$players.cashing",
            },
            avgNumOfCashing: {
              $avg: "$players.numOfCashing",
            },
            totalGames: {
              $sum: 1,
            },
            monthPlayed: {
              $first: "$monthPlayed",
            },
          },
        },
        {
          $project: {
            _id: 1,
            totalProfit: 1,
            avgCashing: {
              $round: ["$avgCashing", 2],
            },
            avgNumOfCashing: {
              $round: ["$avgNumOfCashing", 2],
            },
            totalGames: 1,
            monthPlayed: 1,
          },
        },
        {
          $sort: {
            totalProfit: -1,
          },
        },
      ],
    ]);
    wholeYear.push(getMonths);
  }

  res.send(wholeYear);
};

exports.getThisMonthStats = async function (req, res) {
  const teamId = req.params.teamId;
  const month = req.params.month;
  const getThisMonthStats = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        team_id: teamId,
        createdAt: {
          $gte: new Date(currentYear),
        },
        // $and: [
        //   {
        //     createdAt: {
        //       $gte: new Date("2022"),
        //     },
        //   },
        //   {
        //     createdAt: {
        //       $lt: new Date("2023"),
        //     },
        //   },
        // ],
      },
    },
    {
      $project: {
        monthPlayed: {
          $month: "$createdAt",
        },
        "players.name": 1,
        "players.id": 1,
        "players.image": 1,
        "players.profit": 1,
        "players.cashing": 1,
        "players.numOfCashing": 1,
      },
    },
    {
      $match: {
        monthPlayed: parseInt(month),
      },
    },
    {
      $group: {
        _id: {
          id: "$players.id",
          name: "$players.name",
          image: "$players.image",
        },
        totalProfit: {
          $sum: "$players.profit",
        },
        avgCashing: {
          $avg: "$players.cashing",
        },
        avgNumOfCashing: {
          $avg: "$players.numOfCashing",
        },
        totalGames: {
          $sum: 1,
        },
        monthPlayed: {
          $first: "$monthPlayed",
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalProfit: 1,
        avgCashing: {
          $round: ["$avgCashing", 2],
        },
        avgNumOfCashing: {
          $round: ["$avgNumOfCashing", 2],
        },
        totalGames: 1,
        monthPlayed: 1,
      },
    },
    {
      $sort: {
        totalProfit: -1,
      },
    },
  ]);

  res.send(getThisMonthStats);
};

exports.getAllGamesByTeam = async function (req, res) {
  const teamId = req.params.teamId;
  const getAllGamesByTeam = await Game.aggregate([
    {
      $match: {
        team_id: teamId,
        createdAt: {
          $gte: new Date(currentYear),
        },
      },
    },
    {
      $project: {
        isOpen: 1,
        players: 1,
        game_manager: 1,
        date: {
          $dateToString: {
            date: "$createdAt",
            format: "%d-%m-%Y",
          },
        },
        startTime: {
          $dateToString: {
            date: "$createdAt",
            format: "%H:%M:%S",
            timezone: "Asia/Jerusalem",
          },
        },
        endTime: {
          $dateToString: {
            date: "$updatedAt",
            format: "%H:%M:%S",
            timezone: "Asia/Jerusalem",
          },
        },
      },
    },
    {
      $sort: {
        createdAt: -1,

        "players.profit": -1,
      },
    },
  ]);
  res.send(getAllGamesByTeam);
};
