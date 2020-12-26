var express = require("express");
var router = express.Router();

const PantryModifyMethod = require("../controllers/pantry_controller");

pantryModifyMethod = new PantryModifyMethod();

// get personal pantry, , should verify*
router.get("/", pantryModifyMethod.getAcquireAllPantry);

// add new one new ingreident into pantry, should verify*
router.post("/", pantryModifyMethod.postAddIngredientByName);

// add new one new ingreident into pantry, should verify*
router.post("/id", pantryModifyMethod.postAddIngredientByID);

// delete one specfic ingredient, should verify*
router.delete("/", pantryModifyMethod.deleteRemoveIngredient);

module.exports = router;
