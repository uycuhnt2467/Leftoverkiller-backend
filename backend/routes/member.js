var express = require("express");
var router = express.Router();

const MemberModifyMethod = require("../controllers/member_controller");

let memberModifyMethod = new MemberModifyMethod();

router.post("/register", memberModifyMethod.postRegister);

router.post("/login", memberModifyMethod.postLogin);

router.put("/update", memberModifyMethod.putUpdate);

module.exports = router;
