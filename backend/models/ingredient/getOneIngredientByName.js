const db = require("../connection_db");

module.exports = function getOneIngredient(queryData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // 找尋
        db.query(
            "SELECT * FROM ingredient where ingredient_name=?",
            [queryData.ingredient_name],
            function (err, rows) {
                if (err) {
                    result.success = false;
                    result.status = "搜尋材料失敗。";
                    result.err = "伺服器錯誤，請稍後在試！";
                    reject(result);
                    return;
                }

                if (rows.length == 0) {
                    result.success = false;
                    result.status = "搜尋材料失敗。";
                    result.err = "材料不存在！";
                    reject(result);
                    return;
                }
                const process = {
                    ingredient_id: rows[0].ingredient_id,
                    ingredient_name: rows[0].ingredient_name,
                    image_url: rows[0].imageURL,
                };

                result = { ...process };

                db.query(
                    "SELECT recipe.recipe_id, recipe.popularity, recipe.imageURL, recipe.recipe_name, recipe_ingredient.ingredient_id FROM recipe INNER JOIN recipe_ingredient ON recipe.recipe_id = recipe_ingredient.recipe_id WHERE ingredient_id = (?) ORDER BY popularity DESC",
                    [process.ingredient_id],
                    function (err, rows) {
                        if (err) {
                            result.success = false;
                            result.status = "搜尋食譜排名失敗。";
                            result.err = "伺服器錯誤，請稍後在試！";
                            reject(result);
                            return;
                        }
                        let recipes = rows.map((val) => {
                            return {
                                recipe_id: val.recipe_id,
                                recipe_name: val.recipe_name,
                                img_url: val.imageURL,
                            };
                        });
        
                        recipes = recipes.slice(0, 10);
                        result = {
                            ...result,
                            success: true,
                            recipes: recipes,
                        };
                        resolve(result);
                    }
                );
            }
        );
        
        

       
    });
};
