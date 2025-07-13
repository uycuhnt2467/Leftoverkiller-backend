import express from "express";
const router = express.Router();

import FavoriteModifyMethod from "../controllers/favorite_controller.js";

const favoriteModifyMethod = new FavoriteModifyMethod();

// get personal favorite recipe, should verify*
/**
 * @swagger
 * /favorite/:
 *   get:
 *     summary: Retrieve a list of all favorite recipes
 *     description: Retrieve a list of all favorite recipes from the database.
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: A list of favorite recipes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The favorite recipe ID.
 *                         example: 1
 */
router.get("/", favoriteModifyMethod.getAcquireAllFavorite);

// add new one new ingreident into pantry, should verify*
/**
 * @swagger
 * /favorite/:
 *   post:
 *     summary: Add a recipe to favorites
 *     description: Add a specific recipe to the user's favorites.
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       201:
 *         description: Recipe added to favorites successfully.
 */
router.post("/", favoriteModifyMethod.postAddFavorite);

// delete one specfic ingredient, should verify*
/*
* @swagger
* /favorite/:
*   delete:
*     summary: Remove a recipe from favorites
*     description: Remove a specific recipe from the user's favorites.
*     responses:
*       200:
*         description: Recipe removed from favorites successfully.
*/
router.delete("/", favoriteModifyMethod.deleteRemoveFavorite);

export default router;
