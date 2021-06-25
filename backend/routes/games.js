const express = require("express");
const _ = require("lodash");
const { Game, validate } = require("../models/games");
const auth = require("../middleware/auth");
const router = express.Router();

//gets aggregated results of the team
router.get("/table/:teamId", auth, async (req, res) => {
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
      },
    },
    {
      $sort: {
        totalProfit: -1,
      },
    },
  ]);

  res.send(table);
});

router.get("/stats/:uId", auth, async (req, res) => {
  const stats = await Game.aggregate([
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        "players.id": req.params.uId,
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
  res.send(stats);
});

//gets the latest game
router.get("/last-game/:teamId", auth, async (req, res) => {
  const game = await Game.find({ team_id: req.params.teamId })
    .sort({ created_at: -1 })
    .limit(1);
  res.send(game);
  console.log(game);
});
// specific game
router.get("/:gameId", auth, async (req, res) => {
  const game = await Game.findById(req.params.gameId);
  res.send(game);
});

// gets back all the games
router.get("/", auth, async (req, res) => {
  const game = await Game.find({ team_id: req.body.team_id });
  res.send(game);
});

// submits a new game
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let game = new Game(_.pick(req.body, ["team_name", "team_id", "players"]));
  await game.save();
  res.send(_.pick(game, ["_id", "team_name", "players"]));
});

module.exports = router;
