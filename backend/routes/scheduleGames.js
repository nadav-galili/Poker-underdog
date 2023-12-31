const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const scheduleGamesController = require("../controllers/scheduleGames");

router.post(
  "/saveNewScheduledGame",
  auth,
  scheduleGamesController.saveNewScheduledGame
);

module.exports = router;
