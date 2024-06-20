import db from "../connection_db.js";
import checkFavoriteExist from "./checkFavoriteExist.js";

export default function deleteRecipeFromFavorite(favoriteDeleteData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT recipe_id FROM recipe WHERE recipe_id = ?",
            [favoriteDeleteData.recipe_id],
            function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    console.log(err);
                    result.success = false;
                    result.status = "刪除失敗。";
                    result.err = "伺服器錯誤，請稍後在試！";
                    reject(result);
                    return;
                }
                if (rows.length == 0) {
                    result.success = false;
                    result.status = "刪除失敗。";
                    result.err = "此食譜不存在於資料庫中，無法刪除！";
                    reject(result);
                    return;
                }
                console.log("here");
                console.log(rows[0].recipe_id);
                const recipeId = rows[0].recipe_id;
                const checkData = {
                    user_id: favoriteDeleteData.user_id,
                    recipe_id: recipeId,
                };

                checkFavoriteExist(checkData).then((checkResult) => {
                    if (checkResult.alreadyAdded === true) {
                        db.query(
                            "DELETE FROM user_recipe WHERE user_id = ? and recipe_id = ?",
                            [checkData.user_id, checkData.recipe_id],
                            function (err, rows) {
                                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                                if (err) {
                                    console.log(err);
                                    result.success = false;
                                    result.status = "刪除失敗。";
                                    result.err = "伺服器錯誤，請稍後在試！";
                                    reject(result);
                                    return;
                                }
                                // 若寫入資料庫成功，則回傳給clinet端下：
                                result.success = true;
                                result.status = "刪除成功。";
                                resolve(result);
                            }
                        );
                    } else {
                        result.status = "刪除失敗。";
                        result.success = false;
                        result.err = "此recipe不存放於favorite page中！";
                        reject(result);
                        return;
                    }
                });
            }
        );
    });
};
