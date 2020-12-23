const db = require("../connection_db");
const checkPantryExist = require("./checkPantryExist");

module.exports = function addIngredientToPantry(pantryAddData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // 尋找是否有重複的email
        db.query(
            "SELECT ingredient_id FROM ingredient WHERE ingredient_name = ?",
            [pantryAddData.ingredient_name],
            function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    console.log(err);
                    result.success = false;
                    result.status = "加入失敗。";
                    result.err = "伺服器錯誤，請稍後在試！";
                    reject(result);
                    return;
                }
                if (rows.length == 0) {
                    result.status = "加入失敗。";
                    result.err =
                        "此材料不存在於資料庫中，請從下拉選單中選取最接近的材料！";
                    reject(result);
                    return;
                }
                const ingredientId = rows[0].ingredient_id;
                const checkData = {
                    user_id: pantryAddData.user_id,
                    ingredient_id: ingredientId,
                };

                checkPantryExist(checkData).then((checkResult) => {
                    if (checkResult.alreadyAdded === false) {
                        db.query(
                            "INSERT INTO user_ingredient SET ?",
                            checkData,
                            function (err, rows) {
                                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                                if (err) {
                                    console.log(err);
                                    result.status = "加入失敗。";
                                    result.err = "伺服器錯誤，請稍後在試！";
                                    reject(result);
                                    return;
                                }
                                // 若寫入資料庫成功，則回傳給clinet端下：
                                result.status = "加入成功。";
                                resolve(result);
                            }
                        );
                    } else {
                        result.status = "加入失敗。";
                        result.err = "此材料先前已加入資料庫！";
                        reject(result);
                        return;
                    }
                });

               
            }
        );
    });
};

