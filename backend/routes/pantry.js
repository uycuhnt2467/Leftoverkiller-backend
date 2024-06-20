import express from "express";
const router = express.Router();

import PantryModifyMethod from "../controllers/pantry_controller.js";

const pantryModifyMethod = new PantryModifyMethod();

// get personal pantry, , should verify*
router.get("/", pantryModifyMethod.getAcquireAllPantry);

// add new one new ingreident into pantry, should verify*
router.post("/", pantryModifyMethod.postAddIngredientByName);

// add new one new ingreident into pantry, should verify*
router.post("/id", pantryModifyMethod.postAddIngredientByID);

// delete one specfic ingredient, should verify*
router.delete("/", pantryModifyMethod.deleteRemoveIngredient);

export default router;
