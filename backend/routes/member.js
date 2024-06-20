import express from "express";
const router = express.Router();

import MemberModifyMethod from "../controllers/member_controller.js";

const memberModifyMethod = new MemberModifyMethod();

router.post("/register", memberModifyMethod.postRegister);

router.post("/login", memberModifyMethod.postLogin);

router.put("/update", memberModifyMethod.putUpdate);

export default router;
