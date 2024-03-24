const db = require("../connection_db");
const checkFavoriteExist = require("./checkFavoriteExist");

module.exports = function getDataFromPantry(pantryGetData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM user_recipe WHERE user_id = ?",
            [pantryGetData.user_id],
            function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    console.log(err);
                    result.status = "查詢favorite失敗。";
                    result.err = "伺服器錯誤，請稍後在試！";
                    reject(result);
                    return;
                }
                const recipeList = rows.map((val) => {
                    return val.recipe_id;
                });
                console.log(recipeList);
                if (recipeList.length > 0) {
                    db.query(
                        "SELECT * FROM recipe WHERE recipe_id in (?)",
                        [recipeList],
                        function (err, recipeRows) {
                            if (err) {
                                console.log(err);
                                result.success = false;
                                result.status = "查詢recipe失敗。";
                                result.err = "伺服器錯誤，請稍後在試！";
                                reject(result);
                                return;
                            }

                            const recipeList_info = recipeRows.map((val) => {
                                return {
                                    recipe_id: val.recipe_id,
                                    recipe_name: val.recipe_name,
                                    img_url: val.imageURL,
                                };
                            });
                            result = {
                                success: true,
                                recipes: recipeList_info,
                            };
                            resolve(result);
                        }
                    );
                } else {
                    result = {
                        success: true,
                        recipes: {},
                    };
                    resolve(result);
                }
            }
        );
    });
};
