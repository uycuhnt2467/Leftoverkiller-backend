import express from "express";
const router = express.Router();

import IngredientsModifyMethod from "../controllers/ingredients_controller.js";

const ingredientsModifyMethod = new IngredientsModifyMethod();

router.get("/", ingredientsModifyMethod.getAcquireAllIngredients);

router.get("/:ingredient_id", ingredientsModifyMethod.getSpecificIngredient);

router.post("/name", ingredientsModifyMethod.postSpecificIngredientByName);

export default router;
