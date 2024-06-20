import express from "express";
const router = express.Router();

import SearchModifyMethod from "../controllers/search_controller.js";;
const searchModifyMethod = new SearchModifyMethod();

router.post("/", searchModifyMethod.postSearchByIngredient);

export default router;
