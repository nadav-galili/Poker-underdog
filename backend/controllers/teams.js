const { Team } = require("../models/teams");
const { User } = require("../models/user");
const mongoose = require("mongoose");

exports.deletePlayerFromTeam = async function (req, res) {
  //remove the player from team
  const team = await Team.updateMany(
    { teamNumber: req.params.teamNumber },
    { $pull: { players: { _id: req.params.playerId } } }
  );

  //remove the team from the player
  const player = await User.updateOne(
    { _id: req.params.playerId },
    { $pull: { teams: req.body.teamId } }
  );
  res.send({ Team: team, Player: player });
};

exports.getTeamForSideBets = async function (req, res) {
  const teamId = mongoose.Types.ObjectId(req.params.teamId);

  const teamWithoutPlayer = await Team.aggregate([
    {
      $match: {
        _id: teamId,
      },
    },
    {
      $project: {
        players: {
          $filter: {
            input: "$players",
            as: "player",
            cond: {
              $ne: ["$$player._id", req.params.userId],
            },
          },
        },
      },
    },
    {
      $project: {
        players: {
          $filter: {
            input: "$players",
            as: "player",
            cond: {
              $ne: ["$$player.nickName", "Nispach"],
            },
          },
        },
      },
    },
  ]);

  res.send(teamWithoutPlayer);
};

//NEW CONTORLLERSSSSS

exports.newGetTeam = async function (req, res) {
  const team = await Team.findById(req.params.teamId);
  res.send(team);
};
