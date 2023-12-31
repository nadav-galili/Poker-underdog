// const { Game } = require("../models/games");
const { ScheduleGame, validate } = require("../models/scheduleGames");
const mongoose = require("mongoose");

exports.saveNewScheduledGame = async (req, res) => {
  console.log(
    "🚀 ~ file: scheduleGames.js:6 ~ exports.saveNewScheduledGame= ~ req:",
    req.body
  );
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(
    "🚀 ~ file: scheduleGames.js:11 ~ exports.saveNewScheduledGame= ~ error:",
    error
  );
  const game = req.body;
  const guests = [];
  const newGuest = {};
  newGuest.playerId = game.guestId;
  newGuest.playerName = game.guestNickName;
  newGuest.playerImage = game.guestImage;
  guests.push(newGuest);

  const newGame = new ScheduleGame({
    gameDate: game.gameDate,
    teamId: game.teamId,
    teamName: game.teamName,
    hostId: game.hostId,
    hostName: game.hostName,
    guests: guests,
  });
  await newGame.save();
  res.send(newGame);
};
