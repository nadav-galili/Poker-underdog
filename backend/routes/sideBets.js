const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const sideBetsController = require("../controllers/sideBets.js");

//create a new sidebet
router.post("/", auth, sideBetsController.newSideBet);

module.exports = router;
