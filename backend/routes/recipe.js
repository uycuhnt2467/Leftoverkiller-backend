import express from "express";
const router = express.Router();

import RecipeModifyMethod from '../controllers/recipe_controller.js';

const recipeModifyMethod = new RecipeModifyMethod();

/**
 * @swagger
 * /recipe/:
 *   get:
 *     summary: Retrieve a list of all recipes
 *     description: Retrieve a list of all recipes from the database.
 *     responses:
 *       200:
 *         description: A list of recipes.
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
 *                         description: The recipe ID.
 *                         example: 1
 *                       recipe_name:
 *                         type: string
 *                         description: The name of the recipe.
 *                         example: "Spaghetti Carbonara"
 *                       image_url:
 *                         type: string
 *                         description: The URL of the recipe image.
 *                         example: "http://example.com/image.jpg"
 */
router.get("/", recipeModifyMethod.getAcquireAllRecipes);

/**
 * @swagger
 * /recipe/{recipe_id}:
 *   get:
 *     summary: Retrieve a specific recipe by ID
 *     description: Retrieve a specific recipe by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: recipe_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID.
 *     responses:
 *       200:
 *         description: A specific recipe.
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
 *                         description: The recipe ID.
 *                         example: 1
 *                       recipe_name:
 *                         type: string
 *                         description: The name of the recipe.
 *                         example: "Spaghetti Carbonara"
 *                       image_url:
 *                         type: string
 *                         description: The URL of the recipe image.
 *                         example: "http://example.com/image.jpg"
 *                       instructions:
 *                         type: string
 *                         description: The cooking instructions for the recipe.
 *                         example: "Cook spaghetti, fry pancetta, mix with eggs and cheese."
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ingredient_id:
 *                               type: integer
 *                               description: The ID of the ingredient.
 *                               example: 1
 *                             ingredient_name:
 *                               type: string
 *                               description: The name of the ingredient.
 *                               example: "Spaghetti"
 *                             
 */
router.get("/:recipe_id", recipeModifyMethod.getSpecificRecipe);

/**
 * @swagger
 * /recipe/{name}:
 *   post:
 *     summary: Modify
 *     description: Retrieve a specific recipe by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: recipe_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID.
 *     responses:
 *       200:
 *         description: A specific recipe.
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
 *                         description: The recipe ID.
 *                         example: 1
 *                       recipe_name:
 *                         type: string
 *                         description: The name of the recipe.
 *                         example: "Spaghetti Carbonara"
 *                       image_url:
 *                         type: string
 *                         description: The URL of the recipe image.
 *                         example: "http://example.com/image.jpg"
 *                       instructions:
 *                         type: string
 *                         description: The cooking instructions for the recipe.
 *                         example: "Cook spaghetti, fry pancetta, mix with eggs and cheese."
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             ingredient_id:
 *                               type: integer
 *                               description: The ID of the ingredient.
 *                               example: 1
 *                             ingredient_name:
 *                               type: string
 *                               description: The name of the ingredient.
 *                               example: "Spaghetti"
 *                             
 */
router.post("/:name", recipeModifyMethod.postSpecificRecipe)

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

export default router;
