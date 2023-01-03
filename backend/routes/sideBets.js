const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const sideBetsController = require("../controllers/sideBets.js");

//create a new sidebet
router.post("/", auth, sideBetsController.newSideBet);

//get all sidebets for a team
router.get(
  "/getsidebetsForMainTable/:teamId",
  auth,
  sideBetsController.getsidebetsForMainTable
);

module.exports = router;
