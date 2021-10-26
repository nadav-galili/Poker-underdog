const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const gamesController=require('../controllers/games.js');


//update game by id
router.put('/:gameId',auth,gamesController.updateGame);

///gets aggregate results of personal stats
router.get("/personal/:uId", auth,gamesController.personalStats);

//gets aggregated results of the team
router.get("/table/:teamId", auth, gamesController.teamStats);

// gets  month stats
router.get("/byMonths/:teamId",auth,gamesController.dataByMonths);


//gets the latest game
router.get("/last-game/:teamId",auth,gamesController.lastGame);
// get 10 biggest profits
router.get("/profits/top-ten/:teamId", auth, gamesController.profits);
// get success% 
router.get("/success-p/:teamId",auth, gamesController.successp )
// gets game data by card name
 router.get("/:cardName/:teamId",auth,  gamesController.gamesByCardName);

// specific game
router.get("/:gameId",auth,gamesController.gameById);

// gets back all the games
router.get("/",auth, gamesController.allGames);

// submits a new game
router.post("/", auth, gamesController.newGame);


module.exports = router;
