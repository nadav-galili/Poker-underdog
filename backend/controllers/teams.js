const { Team } = require("../models/teams");

exports.deletePlayerFromTeam = async function (req, res) {
  const team = await Team.updateMany(
    { teamNumber: req.params.teamNumber },
    { $pull: { players: { _id: req.params.playerId } } }
  );
  res.send(team);
};
