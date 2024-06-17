const getAllRecipes = require("../models/recipe/getAllRecipes");
const getOneRecipe = require("../models/recipe/getOneRecipe");
const getOneRecipeByName = require("../models/recipe/getOneRecipeByName")

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
                    result: {
                        err: err,
                        success:false
                    }
                    
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
            recipe_id: req.params.recipe_id,
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

    postSpecificRecipe(req, res, next) {
        const queryData = {
            recipe_name: req.body.recipe_name,
        };
        getOneRecipeByName(queryData).then(
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
        )
    }
};
