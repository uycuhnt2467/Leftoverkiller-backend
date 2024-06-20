import express from "express";
const router = express.Router();

import LogModifyMethod from "../controllers/log_controller.js";

const logModifyMethod = new LogModifyMethod();

// get personal favorite recipe, , should verify*
router.get("/", logModifyMethod.getCheckLog);

export default router;
