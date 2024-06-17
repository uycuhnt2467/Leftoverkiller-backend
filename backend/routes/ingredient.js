var express = require("express");
var router = express.Router();

const IngredientsModifyMethod = require("../controllers/ingredients_controller");

let ingredientsModifyMethod = new IngredientsModifyMethod();

router.get("/", ingredientsModifyMethod.getAcquireAllIngredients);

router.get("/:ingredient_id", ingredientsModifyMethod.getSpecificIngredient);

router.post("/name", ingredientsModifyMethod.postSpecificIngredientByName);

module.exports = router;
