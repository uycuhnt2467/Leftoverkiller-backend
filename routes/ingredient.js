var express = require("express");
var router = express.Router();

const IngredientsModifyMethod = require("../controllers/ingredients_controller");

ingredientsModifyMethod = new IngredientsModifyMethod();


router.get("/allingredients", ingredientsModifyMethod.getAcquireAllIngredients)

router.post("/inquire", ingredientsModifyMethod.getSpecificIngredient)

module.exports = router;
