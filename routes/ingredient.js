var express = require("express");
var router = express.Router();

const IngredientsModifyMethod = require("../controllers/ingredients_controller");

ingredientsModifyMethod = new IngredientsModifyMethod();

router.get("/", ingredientsModifyMethod.getAcquireAllIngredients);

router.get("/:ingredient_id", ingredientsModifyMethod.getSpecificIngredient);

module.exports = router;
