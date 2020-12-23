const jwt = require("jsonwebtoken");

const config = require("../config/development_config");

const getAllRecipes = require("../models/recipe/getAllRecipes");
const getOneRecipe = require("../models/recipe/getOneRecipe");

module.exports = class Recipes {
    getAcquireAllRecipes(req, res, next) {
        // const returnFormat = {
        //     success: false,
        //     recipes: [recipe, recipe, ...],
        //     recipe: {
        //         recipe_id: "",
        //         recipe_name: "",
        //         image_url: "",
        //     },
        // };
        getAllRecipes().then(
            (result) => {
                // 若寫入成功則回傳
                res.json({
                    result: {
                        success: true,
                        recipes: result,
                    },
                });
            },
            (err) => {
                // 若寫入失敗則回傳
                res.json({
                    err: err,
                });
            }
        );
    }
    getSpecificRecipe(req, res, next) {
        // const returnFormat = {
        //     success: false,
        //     recipe_id: "",
        //     recipe_name: "",
        //     image_url: "",
        //     instruction: "",
        //     ingredients: [""],
        // };
        const queryData = {
            recipeId: req.params.recipeId,
        };

        getOneRecipe(queryData).then(
            (result) => {
                // 若寫入成功則回傳
                console.log(result);
                res.json({
                    result: {
                        success: true,
                        ...result,
                    },
                });
            },
            (err) => {
                // 若寫入失敗則回傳
                res.json({
                    result: {
                        success: false,
                        err: err,
                    },
                });
            }
        );
    }
};
