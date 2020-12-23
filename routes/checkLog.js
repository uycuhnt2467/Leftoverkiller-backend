var express = require("express");
var router = express.Router();

const LogModifyMethod = require("../controllers/log_controller.js");

logModifyMethod = new LogModifyMethod();

// get personal favorite recipe, , should verify*
router.get("/", logModifyMethod.getCheckLog);


module.exports = router;
