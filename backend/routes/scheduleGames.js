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

module.exports = router;
