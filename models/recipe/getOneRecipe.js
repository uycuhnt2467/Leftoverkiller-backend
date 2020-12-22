const db = require("../connection_db");

module.exports = function getOneRecipe(queryData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // 找尋
        db.query(
            "SELECT * FROM recipe WHERE recipe_id = ?",
            [queryData.recipeId],
            function (err, rows) {
                if (err) {
                    result.status = "搜尋失敗。";
                    result.err = "無此菜單，請稍後在試！";
                    result.success = false;
                    reject(result);
                    return;
                }

                result.recipe_id = rows[0].recipe_id;
                result.recipe_name = rows[0].recipe_name;
                result.image_url = rows[0].imageURL;
                result.instruction = rows[0].instruction;
            }
        );

        db.query(
            "SELECT * FROM ingredient WHERE ingredient_id IN (SELECT ingredient_id FROM recipe_ingredient WHERE recipe_id = ?)",
            [queryData.recipeId],
            function (err, rows) {
                // console.log(rows);
                if (err) {
                    result.status = "菜單資訊搜尋失敗。";
                    result.err = "查無此菜單原料資訊，請稍後在試！";
                    result.success = false;
                    reject(result);
                    return;
                }

                result.ingredients = rows.map((val) => {
                    return {
                        ingredient_id: val.ingredient_id,
                        ingredient_name: val.ingredient_name,
                        image_url: val.imageURL,
                    };
                });
                resolve(result)
            }
        );
    });
};
