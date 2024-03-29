const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const scheduleGamesController = require("../controllers/scheduleGames");

router.post(
  "/saveNewScheduledGame",
  auth,
  scheduleGamesController.saveNewScheduledGame
);

router.get(
  "/getLatestScheduleGame/:teamId",
  auth,
  scheduleGamesController.getLatestScheduleGame
);

router.get(
  "/getScheduledGameById/:gameId",
  auth,
  scheduleGamesController.getScheduledGameById
);

router.put(
  "/updateScheduledGame/:gameId",
  auth,
  scheduleGamesController.updateScheduledGame
);

router.put(
  "/updateHost/:gameId/:hostId",
  auth,
  scheduleGamesController.updateHost
);
module.exports = router;
