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

router.get(
  "/gotOfferedSidebet/:userId",
  auth,
  sideBetsController.gotOfferedSidebet
);

router.put("/acceptSideBet/:sideBetId", auth, sideBetsController.acceptSideBet);

router.put(
  "/dismissSideBet/:sideBetId",
  auth,
  sideBetsController.dismissSideBet
);

router.get(
  "/getAllApprovedSideBets/:teamId",
  auth,
  sideBetsController.getAllApprovedSideBets
);

router.post(
  "/getExtraDetais/:sideBetId",
  auth,
  sideBetsController.getExtraDetais
);
module.exports = router;
