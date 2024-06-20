import db from "../connection_db.js";
import checkPantryExist from "./checkPantryExist.js";

export default function addIngredientToPantry(pantryDeleteData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT ingredient_id FROM ingredient WHERE ingredient_id = ?",
            [pantryDeleteData.ingredient_id],
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
                    result.err = "此材料不存在於資料庫中，無法刪除！";
                    reject(result);
                    return;
                }
                const ingredientId = rows[0].ingredient_id;
                const checkData = {
                    user_id: pantryDeleteData.user_id,
                    ingredient_id: ingredientId,
                };

                checkPantryExist(checkData).then((checkResult) => {
                    if (checkResult.alreadyAdded === true) {
                        db.query(
                            "DELETE FROM user_ingredient WHERE user_id = ? and ingredient_id = ?",
                            [checkData.user_id, checkData.ingredient_id],
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
                        result.err = "此材料不存放於材料櫃中！";
                        reject(result);
                        return;
                    }
                });
            }
        );
    });
};
