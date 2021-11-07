const _ = require("lodash");
const { H2h, validate } = require("../models/h2h");
const { Game } = require("../models/games");

exports.newH2h = async function (req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let players = req.body.players;

  if (players.length % 2 !== 0) {
    players.push({ id: "1234", name: "monkey", image: "uploads/monkey.jpg", profit: 0 });
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
    { players: h2h[0].players },
    { new: true }
  );
  await res.send(newH2h);
};

exports.getplayerStats=async function(req, res){
  const agg =await H2h.aggregate(
    [
      {
        $unwind: {
          path: '$players'
        }
      }, {
        $unwind: {
          path: '$players'
        }
      }, {
        $match: {
         "players.id": req.params.pId
        }
      }, {
        $group: {
          _id: {
          name: '$players.name', 
            player_id: '$players.id'
          }, 
          totalPoints: {
            $sum: '$players.points'
          }
        }
      }
    ]
  );
  res.send(agg)
}