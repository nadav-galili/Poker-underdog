const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const gamesController = require("../controllers/games.js");

//get stats per hour
router.get("/statsPerHour/:teamId", gamesController.statsPerHour);
// count all games by teamId
router.get("/totalGames/:teamId", auth, gamesController.totalGames);
//update game by id
router.put("/:gameId", auth, gamesController.updateGame);

///gets aggregate results of personal stats
router.get("/personal/:uId", auth, gamesController.personalStats);

// gets game details for user
router.get("/personalGames/:uId", auth, gamesController.personalGames);
//gets aggregated results of the team
router.get("/table/:teamId", auth, gamesController.teamStats);

// gets  month stats
router.get("/byMonths/:month/:teamId", auth, gamesController.dataByMonths);
//get monthly by player for chart
router.get("/monthlyByPlayer/:teamid", auth, gamesController.monthlyByPlayer);
//game in progrerss
router.get("/true/:teamId", auth, gamesController.gameInProgress);
//gets the latest game
router.get("/last-game/:teamId", auth, gamesController.lastGame);
// get 10 biggest profits
router.get("/profits/top-ten/:teamId", auth, gamesController.profits);

//get the cashing details for a game
router.get(
  "/cashingDetails/:gameId",
  auth,
  gamesController.fetchCashingDetails
);

// get aggregated results of top 10 profits
router.get("/agg_profits/top-ten/:teamId", auth, gamesController.agg_profits);
//get previous rank
router.get("/previousRank/:teamId", auth, gamesController.previousRank);
//get monthly stats
router.get("/monthlyStats/:teamId", auth, gamesController.monthlyStats);
// get success%
router.get("/success-p/:teamId", auth, gamesController.successp);
// gets game data by card name
router.get("/:cardName/:teamId", auth, gamesController.gamesByCardName);

//update the game manager
router.put(`/updateManager/:gameId`, gamesController.updateManager);
// gets agg cashing of all the games for a team
router.get("/total/cash/:teamId", auth, gamesController.totalCash);
// specific game
router.get("/:gameId", auth, gamesController.gameById);

//games by team
router.get("/teams/byTeamId/:teamId", auth, gamesController.byTeamId);
// gets back all the games
router.get("/", auth, gamesController.allGames);

// submits a new game
router.post("/", auth, gamesController.newGame);

module.exports = router;
