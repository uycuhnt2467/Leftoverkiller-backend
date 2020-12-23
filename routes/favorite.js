var express = require("express");
var router = express.Router();

const FavoriteModifyMethod = require("../controllers/favorite_controller");

favoriteModifyMethod = new FavoriteModifyMethod();



// get personal favorite recipe, , should verify*
router.get("/", favoriteModifyMethod.getAcquireAllFavorite);

// add new one new ingreident into pantry, should verify*
router.post("/", favoriteModifyMethod.postAddFavorite);


// delete one specfic ingredient, should verify*
router.delete("/", favoriteModifyMethod.deleteRemoveFavorite);


module.exports = router;
