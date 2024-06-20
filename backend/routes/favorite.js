import express from "express";
const router = express.Router();

import FavoriteModifyMethod from "../controllers/favorite_controller.js";

const favoriteModifyMethod = new FavoriteModifyMethod();

// get personal favorite recipe, , should verify*
router.get("/", favoriteModifyMethod.getAcquireAllFavorite);

// add new one new ingreident into pantry, should verify*
router.post("/", favoriteModifyMethod.postAddFavorite);

// delete one specfic ingredient, should verify*
router.delete("/", favoriteModifyMethod.deleteRemoveFavorite);

export default router;
