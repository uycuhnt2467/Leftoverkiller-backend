var express = require("express");
var router = express.Router();

const RecipeModifyMethod = require("../controllers/recipe_controller");

recipeModifyMethod = new RecipeModifyMethod();

// return all recipes
router.get("/", recipeModifyMethod.getAcquireAllRecipes);

// retun one specfic recipes
router.get("/:recipeId", recipeModifyMethod.getSpecificRecipe);

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

module.exports = router;
