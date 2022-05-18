const _ = require("lodash");
const { H2h, validate } = require("../models/h2h");
const { Game } = require("../models/games");

exports.newH2h = async function (req, res) {
  const { error } = validate(req.body);
  // if (error) console.log(error.details[0].message);
  if (error) return res.status(400).send(error.details[0].message);
  let players = req.body.players;

  if (players.length % 2 !== 0) {
    players.push({
      id: "1234",
      name: "monkey",
      image: "uploads/monkey.jpg",
      profit: 0,
    });
  }
  var splitAt = function (i, xs) {
    var a = xs.slice(0, i);
    var b = xs.slice(i, xs.length);
    return [a, b];
  };

  var shuffle = function (xs) {
    return xs.slice(0).sort(function () {
      return 0.5 - Math.random();
    });
  };

  var zip = function (xs) {
    return xs[0].map(function (_, i) {
      return xs.map(function (x) {
        return x[i];
      });
    });
  };

  var result = zip(splitAt(players.length / 2, shuffle(players)));
  let h2h = _.pick(req.body, ["team_id", "gameId"]);
  h2h.players = result;
  let newH2h = new H2h(h2h);
  await newH2h.save();
  res.send(newH2h);
};

exports.getByGameId = async function (req, res) {
  const game = await H2h.find({
    gameId: req.params.gameId,
  });
  res.send(game);
};

exports.updateh2h = async function (req, res) {
  const h2h = await H2h.find({
    gameId: req.params.gameId,
  });
  const game = await Game.find({
    _id: req.params.gameId,
  });

  let h2harr = _.flatten(h2h[0].players);
  let gamearr = _.flatten(game[0].players);
  h2harr.map((p) => {
    let result = gamearr.find((e) => e.id === p.id);
    if (result) {
      p.profit = result.profit;
    }

    return p;
  });
  h2harr = _.chunk(h2harr, 2);
  for (let i = 0; i < h2harr.length; i++) {
    if (h2harr[i][0].profit === h2harr[i][1].profit) {
      h2harr[i][0].points = 1;
      h2harr[i][1].points = 1;
    } else if (h2harr[i][0].profit > h2harr[i][1].profit) {
      h2harr[i][0].points = 3;
      h2harr[i][1].points = 0;
    } else {
      h2harr[i][0].points = 0;
      h2harr[i][1].points = 3;
    }
  }
  h2h[0].players = h2harr;

  let newH2h = await H2h.findOneAndUpdate(
    { gameId: req.params.gameId },
    { $set: { players: h2h[0].players } },
    { new: true }
  );
  await res.send(newH2h);
};

exports.addPlayersH2h = async function (req, res) {
  // console.log("req", req.body.players.length);
  let selected = req.body.players;
  // console.log("selected", selected);
  let h2h = await H2h.find({ gameId: req.params.gameId });
  let h2hPlayers = h2h[0].players;
  // console.log("first", h2hPlayers);
  h2hPlayers = _.flatten(h2hPlayers);
  console.log("playersafter", h2hPlayers);
  // console.log("2222", h2h);
  function getDifference(selected, h2hPlayers) {
    return selected.filter((object1) => {
      return !h2hPlayers.some((object2) => {
        return object1.id === object2.id;
      });
    });
  }
  let monkey = {
    id: "1234",
    name: "monkey",
    image: "uploads/monkey.jpg",
    profit: 0,
  };
  let added = getDifference(selected, h2hPlayers);
  const hasMonkey = h2hPlayers.some((ele) => {
    return ele.id === "1234";
  });
  const monkeyIndex = h2hPlayers.findIndex((ele) => ele.id === "1234");
  console.log("index", monkeyIndex);
  if (added.length % 2 !== 0 && !hasMonkey) {
    added.push(monkey);
  }
  if (
    added.length + (h2hPlayers.length % 2) !== 0 &&
    hasMonkey &&
    added.length === 1
  ) {
    h2hPlayers[monkeyIndex] = added[0];
  }
  console.log("added", added);

  var splitAt = function (i, xs) {
    var a = xs.slice(0, i);
    var b = xs.slice(i, xs.length);
    return [a, b];
  };

  var shuffle = function (xs) {
    return xs.slice(0).sort(function () {
      return 0.5 - Math.random();
    });
  };

  var zip = function (xs) {
    return xs[0].map(function (_, i) {
      return xs.map(function (x) {
        return x[i];
      });
    });
  };

  let result = zip(splitAt(added.length / 2, shuffle(added)));
  result = _.flatten(result);
  console.log("shuffeld added", result);
  console.log("players in db", h2hPlayers);
  h2hPlayers = h2hPlayers.concat(result);

  let mergedUpdatedPlayers = [];
  let x = 0;
  for (let i = 0; i < h2hPlayers.length / 2; i++) {
    mergedUpdatedPlayers[i] = [];
    for (let j = 0; j < 2; j++) {
      mergedUpdatedPlayers[i][j] = h2hPlayers[x];
      x++;
    }
  }
  console.log("mergedUpdatedPlayers", mergedUpdatedPlayers);
  let updatedPlayers = await H2h.findOneAndUpdate(
    { gameId: req.params.gameId },
    { $set: { players: mergedUpdatedPlayers } },
    { new: true }
  );
  await res.send(updatedPlayers);
};

exports.getplayerStats = async function (req, res) {
  const agg = await H2h.aggregate([
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $match: {
        "players.id": req.params.pId,
      },
    },
    {
      $group: {
        _id: {
          name: "$players.name",
          player_id: "$players.id",
        },
        totalPoints: {
          $sum: "$players.points",
        },
      },
    },
  ]);
  res.send(agg);
};

exports.h2hGamesByTeam = async function (req, res) {
  const agg = await H2h.aggregate([
    {
      $match: {
        team_id: req.params.teamId,
      },
    },
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $unwind: {
        path: "$players",
      },
    },
    {
      $group: {
        _id: {
          name: "$players.name",
          image: "$players.image",
          player_id: "$players.id",
        },
        totalPoints: {
          $sum: "$players.points",
        },
        numOfGames: {
          $sum: 1,
        },
        avgPoints: {
          $avg: "$players.points",
        },
      },
    },
    {
      $project: {
        totalPoints: 1,
        numOfGames: 1,
        avgPoints: 1,
        successPercentage: {
          $round: [
            {
              $multiply: [
                {
                  $divide: ["$totalPoints", { $multiply: ["$numOfGames", 3] }],
                },
                100,
              ],
            },
            2,
          ],
        },
      },
    },
    {
      $sort: {
        avgPoints: -1,
      },
    },
  ]);
  await res.send(agg);
};

exports.teamAllGames = async function (req, res) {
  let game = await H2h.find({ team_id: req.params.teamId }).sort({
    createdAt: -1,
  });
  res.send(game);
};
