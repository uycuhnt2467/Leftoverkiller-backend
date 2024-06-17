var express = require("express");
var router = express.Router();

const SearchModifyMethod = require("../controllers/search_controller");;
let searchModifyMethod = new SearchModifyMethod();


router.post("/", searchModifyMethod.postSearchByIngredient);

module.exports = router;
