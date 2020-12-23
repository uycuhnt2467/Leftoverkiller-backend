const db = require("../connection_db");
const checkPantryExist = require("./checkPantryExist");

module.exports = function getDataFromPantry(pantryGetData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // 尋找是否有重複的email
        db.query(
            "SELECT * FROM user_ingredient WHERE user_id = ?",
            [pantryGetData.user_id],
            function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    console.log(err);
                    result.status = "查詢pantry失敗。";
                    result.err = "伺服器錯誤，請稍後在試！";
                    reject(result);
                    return;
                }
                const ingredientList = rows.map((val) => {
                    return val.ingredient_id;
                });
                console.log(ingredientList);
                if (ingredientList.length > 0) {
                    db.query(
                        "SELECT * FROM ingredient WHERE ingredient_id in (?)",
                        [ingredientList],
                        function (err, ingrRows) {
                            if (err) {
                                console.log(err);
                                result.success = false;
                                result.status = "查詢ingredient失敗。";
                                result.err = "伺服器錯誤，請稍後在試！";
                                reject(result);
                                return;
                            }

                            const ingredient_info = ingrRows.map((val) => {
                                return {
                                    ingredient_id: val.ingredient_id,
                                    ingredient_name: val.ingredient_name,
                                    img_url: val.imageURL,
                                };
                            });
                            result = {
                                success: true,
                                ingredients: ingredient_info,
                            };
                            resolve(result);
                        }
                    );
                } else {
                    result ={
                        success: true,
                        ingredients:{},
                    }
                    resolve(result)
                }
            }
        );
    });
};
