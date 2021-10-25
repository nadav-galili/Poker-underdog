const _ = require("lodash");
const { Game, validate } = require("../models/games");
// const { GamePlayers } = require("../models/gamePlayers");

exports.newGame = async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let game = new Game(_.pick(req.body, ["team_name", "team_id", "players"]));
  await game.save();
  res.send(game);
};

exports.teamStats = async function (req, res) {
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
      },
    },
    {
      $project: {
        players: 1,
        created_at: 1,
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
          $avg: "$players.numOfcashing",
        },
        lastGame: {
          $max: "$created_at",
        },
        gamesWithProfit: {
          $sum: "$gamesWithPlus",
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
      },
    },
    {
      $project: {
        players: 1,
        created_at: 1,
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
  const game = await Game.find({ team_id: req.params.teamId })
    .sort({ created_at: -1 })
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
  const game = await Game.find({ team_id: req.body.team_id });
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
      },
    },
    {
      $group: {
        _id: {
          monthPlayed: { $month: "$created_at" },
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
          $avg: "$players.numOfcashing",
        },
        lastGame: {
          $max: "$created_at",
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
        "players.id": {
          $in: [req.params.uId],
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
          $avg: "$players.numOfcashing",
        },
        lastGame: {
          $max: "$created_at",
        },
      },
    },
  ]);

  res.send(agg);
};

exports.gamesByCardName = async function (req, res) {
  let cardTitle = req.params.cardName;
  cardTitle = "$" + cardTitle;

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
      },
    },
    {
      $project: {
        players: 1,
        created_at: 1,
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
          $avg: "$players.numOfcashing",
        },
        lastGame: {
          $max: "$created_at",
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
        // created_at: 1,
        team_name: 1,
        team_id: 1,
        // gamesWithPlus: 1,
        // totalProfit: 1,
        // avgProfit: {
        //     $round: ["$avgProfit", 2]
        // },
        // numOfGames: 1,
        // avgCashing: {
        //     $round: ["$avgCashing", 2]
        // },
        // lastGame: 1,
        // gamesWithProfit: 1,
        cardTitle: { $round: [cardTitle, 2] },
      },
    },

    {
      $sort: {
        cardTitle: -1,
      },
    },
  ]);

  res.send(table);
};

// exports.newGame = async function (req, res) {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   // let game = new Game(_.pick(req.body, ["team_name", "team_id"]));
//   // let game = _.pick(req.body, ["team_name", "team_id"]);
//   const createGame = function (game) {
//     return Game.create(game).then((gameInfo) => {
//       return gameInfo;
//     });
//   };

//   let players = req.body.players;
//   const createGamePlayers = function (gameId, players) {
//     return GamePlayers.create(players).then((players) => {
//       return Game.findByIdAndUpdate(gameId, {
//         $push: {
//           players: {
//             _id: players._id,
//             profit: players.profit,
//             cashing: players.cashing,
//             numOfcashing: players.numofcashing,
//             cashInHand: players.cashInHand,
//             gameRank: players.gameRank,
//           },
//         },
//       });
//     });
//   };

//   const run = async () => {
//     let game = await createGame({
//       team_id: req.body.teamId,
//       team_name: req.body.team_name,
//     },
//     );

//     game = await createGamePlayers(game._id, {
//       profit: players.profit,
//       cashing: players.cashing,
//       numOfcashing: players.numOfcashing,
//       cashInHand: players.cashInHand,
//       gameRank: players.gameRank,
//     });
//     // players.map(async p=>(
//     //   await createGamePlayers(game._id,
//     //     {
//     //       profit:p.profit,
//     //       cashing:p.cashing,
//     //       numOfcashing:p.numOfcashing,
//     //       cashInHand:p.cashInHand,
//     //       gameRank:p.gameRank
//     //     })
//     // ))

//     // console.log(p);
//     return game;
//   };
//   run();
//   // let gamePlayers = new GamePlayers();

//   // await game.save();
//   // res.send(_.pick(game, ["_id", "team_name", "players"]));
// };
