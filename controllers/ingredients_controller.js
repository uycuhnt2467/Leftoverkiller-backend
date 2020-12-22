const jwt = require("jsonwebtoken");

const config = require("../config/development_config");

const getAllIngredients = require("../models/ingredient/getAllIngredients");
const getOneIngredient = require("../models/ingredient/getOneIngredient");

module.exports = class Ingredients {
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
                // 若寫入成功則回傳
                console.log(result);
                res.json({
                    success: true,
                    ingredients: result,
                });
            },
            (err) => {
                // 若寫入失敗則回傳
                res.json({
                    success: false,
                    err: err,
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
            ingredient_id: req.body.ingredient_id,
        };

        getOneIngredient(queryData).then(
            (result) => {
                // 若寫入成功則回傳
                console.log(result);
                res.json({
                    success: true,
                    ...result,
                });
            },
            (err) => {
                // 若寫入失敗則回傳
                res.json({
                    success: false,
                    err: err,
                });
            }
        );
    }
};
