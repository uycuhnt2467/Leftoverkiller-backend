const jwt = require("jsonwebtoken");

const config = require("../config/development_config");

const searchRecipe = require("../models/search/searchRecipe");

module.exports = class Search {
    postSearchByIngredient(req, res, next) {
        const ingredientList = req.body.ingredients;
        searchRecipe(ingredientList).then(
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
                        success: false,
                    },
                });
            }
        );
    }
};
