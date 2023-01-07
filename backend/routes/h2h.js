const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const h2hController = require("../controllers/h2h");

router.post("/", auth, h2hController.newH2h);
router.get("/:gameId", auth, h2hController.getByGameId);
router.get("/teamAllGames/:teamId", auth, h2hController.teamAllGames);
router.put("/updateh2h/:gameId", auth, h2hController.updateh2h);
router.get("/byPlayer/:pId", auth, h2hController.getplayerStats);
router.get("/byTeam/:teamId", auth, h2hController.h2hGamesByTeam);
//add/remove players from h2h
router.put("/addPlayersH2h/:gameId", auth, h2hController.addPlayersH2h);

//NEW ROUTES
//***** */
router.get("/newMainStats/head2head/:teamId", auth, h2hController.getH2hStats);

module.exports = router;
