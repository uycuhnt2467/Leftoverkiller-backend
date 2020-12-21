var express = require("express");
var router = express.Router();

// const MemberModifyMethod = require("../controllers/member_controller");

memberModifyMethod = new MemberModifyMethod();

// return all recipes
router.get("/", () => {
    return "a";
});

// return one specfic recipes
router.get("/:recipeId", () => {
    return "a";
});

// return one specfic recipes
router.post("/", () => {
    return "a";
});

// revise one specfic recipes
router.put("/", () => {
    return "a";
});

// delete one specfic recipes
router.delete("/", () => {
    return "a";
});


// router.post("/login", memberModifyMethod.postLogin);
// router.put("/update", memberModifyMethod.putUpdate);

module.exports = router;
