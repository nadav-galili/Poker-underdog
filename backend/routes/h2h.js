const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const router = express.Router();
const h2hController=require('../controllers/h2h')

router.post('/',auth,h2hController.newH2h);
router.get('/:gameId', auth, h2hController.getByGameId)
router.put('/updateh2h/:gameId', auth, h2hController.updateh2h)
module.exports = router;