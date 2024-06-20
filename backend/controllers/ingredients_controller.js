import getAllIngredients from '../models/ingredient/getAllIngredients.js';
import getOneIngredient from '../models/ingredient/getOneIngredient.js';
import getOneIngredientByName from '../models/ingredient/getOneIngredientByName.js';

export default class Ingredients {
    // get_ingredients.php
    getAcquireAllIngredients(req, res, next) {
        // const returnFormat = {
        //     success: false,
        //     ingredients: [ingredient, ...],
        //     ingredient: {
        //         ingredient_id: "",
        //         ingredient_name: "",
        //         image_url: "",
        //     },
        // };
        getAllIngredients().then(
            (result) => {
                res.json({
                    result: {
                        success: true,
                        ingredients: result,
                    },
                });
            },
            (err) => {
                res.json({
                    result: {
                        success: false,
                        ...err,
                    },
                });
            }
        );
    }
    getSpecificIngredient(req, res, next) {
        // const returnFormat = {
        //     success: false,
        //     ingredient_id: "",
        //     ingredient_name: "",
        //     image_url: "",
        //     top_recipes: [recipe, ...],
        //     // recipe: {
        //     // recipe_id, recipe_name, image_url
        //     // },
        // };

        const queryData = {
            ingredient_id: req.params.ingredient_id,
        };

        getOneIngredient(queryData).then(
            (result) => {
                res.json({
                    result: {
                        ...result,
                    },
                });
            },
            (err) => {
                res.json({
                    result: {
                        ...err,
                    },
                });
            }
        );
    }

    postSpecificIngredientByName(req, res, next) {
        // console.log(req.body);
        const queryData = {
            ingredient_name: req.body.ingredient_name,
        };

        getOneIngredientByName(queryData).then(
            (result) => {
                res.json({
                    result: {
                        ...result,
                    },
                });
            },
            (err) => {
                res.json({
                    result: {
                        ...err,
                    },
                });
            }
        );
    }

};
