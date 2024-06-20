// get_ingredient_id
import db from "../connection_db.js";

export default function searchRecipes(ingredientList) {
    let result = {};
    let ingredients_id = [];

    return new Promise((resolve, reject) => {
        // 找尋
        db.query(
            "SELECT ingredient_id FROM ingredient WHERE ingredient_name in (?)",
            [ingredientList],
            function (err, rows) {
                if (err) {
                    result.success = false;
                    result.status = "搜尋失敗。";
                    result.err = "伺服器錯誤，請稍後在試！";
                    reject(result);
                    return;
                }

                ingredients_id = rows.map((val) => val.ingredient_id);

                db.query(
                    "SELECT * FROM recipe WHERE recipe_id NOT IN (SELECT DISTINCT recipe_id FROM recipe_ingredient WHERE ingredient_id NOT IN (?));",
                    [ingredients_id],
                    function (err, rowsRecipes) {
                        if (err) {
                            result.success = false;
                            result.status = "搜尋現有食譜失敗。";
                            result.err = "伺服器錯誤，請稍後在試！";
                            reject(result);
                            return;
                        }

                        result = rowsRecipes.map((val) => ({
                            recipe_id: val.recipe_id,
                            recipe_name: val.recipe_name,
                            image_url: val.imageURL,
                        }));
                        result.success = true;
                        resolve(result);
                    }
                );
            }
        );
    });
};
