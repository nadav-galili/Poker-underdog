const { Team } = require("../models/teams");
const { User } = require("../models/user");

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
