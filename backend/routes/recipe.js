import express from "express";
const router = express.Router();

import RecipeModifyMethod from '../controllers/recipe_controller.js';

const recipeModifyMethod = new RecipeModifyMethod();

// return all recipes
router.get("/", recipeModifyMethod.getAcquireAllRecipes);

// retun one specfic recipes
router.get("/:recipe_id", recipeModifyMethod.getSpecificRecipe);

// get recipe by recipe_name
router.post("/name", recipeModifyMethod.postSpecificRecipe)

// add new one specfic recipes, administrator only *
// router.post("/r", () => {
//     return "a";
// });

// revise one specfic recipes, administrator only *
// router.put("/", () => {
//     return "a";
// });

// delete one specfic recipes, administrator only *
// router.delete("/", () => {
//     return "a";
// });

// router.post("/login", memberModifyMethod.postLogin);
// router.put("/update", memberModifyMethod.putUpdate);

export default router;
