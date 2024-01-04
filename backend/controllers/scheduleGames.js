// const { Game } = require("../models/games");
const { ScheduleGames, validate } = require("../models/scheduleGames");
const mongoose = require("mongoose");
const { User } = require("../models/user");
const _ = require("lodash");

exports.saveNewScheduledGame = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const game = req.body;
  let hostId = req.body.hostId;

  // Find guest and host details and convert them to plain objects
  let guest = await User.findById(game.guests[0].guestId)
    .select("_id nickName image")
    .lean(); // .lean() converts Mongoose document to a plain JavaScript object

  let host = "";
  if (hostId !== "TBA") {
    host = await User.findById(game.hostId).select("_id nickName image").lean();
  } else {
    host = { _id: "TBA", nickName: "TBA", image: "TBA" };
  }

  // If guest is not found, handle the error
  if (!guest) {
    return res.status(404).send("Guest not found");
  }

  // If host is not found, handle the error
  if (!host) {
    return res.status(404).send("Host not found");
  }

  // Add the guestAnswer property to the guest object
  guest = {
    ...guest,
    guestAnswer: game.guests[0].guestAnswer,
    createdAt: new Date(),
  };

  // Create a new game with the modified guest object
  const newGame = new ScheduleGames({
    gameDate: game.gameDate,
    teamId: game.teamId,
    teamName: game.teamName,
    teamImage: game.teamImage,
    host: host,
    guests: [guest],
  });

  await newGame.save();
  res.status(200).send(newGame);
};

exports.getLatestScheduleGame = async (req, res) => {
  let teamId = req.params.teamId;
  ///convert teamId to ObjectId
  teamId = mongoose.Types.ObjectId(teamId);
  // If teamId is not a valid ObjectId, handle the error
  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(404).send("Invalid teamId");
  }

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00

  // Find the latest game for the team where gameDate is equal to or larger than today
  const latestGame = await ScheduleGames.find({
    teamId: teamId,
    gameDate: { $gte: today },
  })
    .sort({ gameDate: -1 })
    .limit(1);

  if (!latestGame) {
    return res.status(404).send("Game not found");
  }

  res.status(200).send(latestGame);
};

exports.getScheduledGameById = async (req, res) => {
  // Find the game by id
  const game = await ScheduleGames.findById(req.params.gameId);

  if (!game) {
    return res.status(404).send("Game not found");
  }

  res.status(200).send(game);
};

exports.updateScheduledGame = async (req, res) => {
  const gameId = req.params.gameId;
  const { guestAnswer, guestId } = req.body;

  const scheduledGame = await ScheduleGames.findById(gameId);
  console.log(
    "🚀 ~ file: scheduleGames.js:87 ~ exports.updateScheduledGame= ~ scheduledGame:",
    scheduledGame.guests
  );
  if (!scheduledGame) {
    return res.status(404).send("Game not found");
  }
  // Find the guest in the guests array
  let guest = scheduledGame.guests.find(
    (guest) => guest._id.toString() === guestId.toString()
  );

  // If guest is not found, handle the error
  if (!guest) {
    const newGuset = await User.findById(guestId)
      .select("_id nickName image")
      .lean(); // .lean() converts Mongoose document to a plain JavaScript object
    // Add the guestAnswer property to the guest object
    guest = {
      ...newGuset,
      guestAnswer: guestAnswer,
      createdAt: new Date(),
    };
    // Add the guest to the guests array
    scheduledGame.guests.push(guest);
    // Save the game
    await scheduledGame.save();
    return res.status(200).send(scheduledGame);
  }

  // Update the guestAnswer property
  guest.guestAnswer = guestAnswer;

  // Update the game
  const updatedGame = await ScheduleGames.findByIdAndUpdate(
    gameId,
    {
      $set: {
        "guests.$[element].guestAnswer": guestAnswer,
        "guests.$[element].updatedAt": new Date(),
      },
    },
    {
      new: true,
      arrayFilters: [{ "element._id": mongoose.Types.ObjectId(guestId) }],
    }
  );

  res.status(200).send(updatedGame);
};

exports.updateHost = async (req, res) => {
  const gameId = req.params.gameId;
  const hostId = req.params.hostId;
  let host = "";
  const scheduledGame = await ScheduleGames.findById(gameId);

  if (!scheduledGame) {
    return res.status(404).send("Game not found");
  }

  if (hostId !== "TBA") {
    // Find the host in the guests array
    host = await User.findById(hostId).select("_id nickName image").lean();

    if (!host) {
      return res.status(404).send("Host not found");
    }
  } else {
    host = { _id: "TBA", nickName: "TBA", image: "TBA" };
  }

  // Update the game
  const updatedGame = await ScheduleGames.findByIdAndUpdate(
    gameId,
    {
      $set: {
        host: host,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).send(updatedGame);
};
