// const Model=require('../models');
// const {games, teams, user}=Model;
const express = require("express");
const _ = require("lodash");
const { Game, validate } = require("../models/games");
const auth = require("../middleware/auth");
const router = express.Router();


exports.teamStats=async function (req, res){
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
                          $gt: ["$players.profit", 0]
                      },
                      then: 1,
                      else: 0
                  }
              },
      
          }
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
              $sum: "$gamesWithPlus"
          },
          },
        },
        {
          $project: {
              successPercentage: {
                  $round: [{
                      $multiply: [{
                          $divide: ["$gamesWithProfit", "$numOfGames"]
                      }, 100]
                  }, 2]
              },
      
              players: 1,
              created_at: 1,
              team_name: 1,
              team_id: 1,
              gamesWithPlus: 1,
              totalProfit: 1,
              avgProfit: {
                  $round: ["$avgProfit", 2]
              },
              numOfGames: 1,
              avgCashing: {
                  $round: ["$avgCashing", 2]
              },
              lastGame: 1,
              gamesWithProfit: 1
      
          }
      },
        {
          $sort: {
            totalProfit: -1,
          },
        },
      ]);
    
      res.send(table);
}

exports.lastGames=async function(req,res){
    const game = await Game.find({ team_id: req.params.teamId })
    .sort({ created_at: -1 })
    .limit(1);
  res.send(game)
}

exports.allGames=async function (req, res){
    const game = await Game.find({ team_id: req.body.team_id });
    res.send(game);
}
exports.gameById=async function (req, res){
    const game = await Game.findById(req.params.gameId);
    res.send(game);
}
exports.dataByMonths=async function(req,res){
    const byMonths=await Game.aggregate(
        [{$unwind: {
          path: "$players",
        
          preserveNullAndEmptyArrays: true
        }}, {  $match: {
          team_id: req.params.teamId,
        },}, {$group: {
          _id:{   monthPlayed:{$month:"$created_at"},
                  name: "$players.name",
                  image: "$players.image",
                  player_id: "$players.id",
                  team_id: "$team_id",
                  team_name: "$team_name"},
        
                    totalProfit: {
                  $sum: "$players.profit",
                },  avgProfit: {
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
        
        }}, {$sort: {
             totalProfit: -1,
        }}]
    )
    res.send(byMonths);
}

exports.personalStats=async function(req,res){
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
}

exports.newGame=async function (req, res){
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let game = new Game(_.pick(req.body, ["team_name", "team_id", "players"]));
    await game.save();
    res.send(_.pick(game, ["_id", "team_name", "players"]));
}
