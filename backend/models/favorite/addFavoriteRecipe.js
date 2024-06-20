import db from "../connection_db.js";
import checkFavoriteExist from "./checkFavoriteExist.js";

export default function addIngredientToPantry(favoriteAddData) {
    let result = {};
    return new Promise((resolve, reject) => {
        console.log("herrr")
        db.query(
            "SELECT * FROM recipe WHERE recipe_id = ?",
            [favoriteAddData.recipe_id],
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
                        "此食譜不存在於資料庫中，請按照搜尋結果加入！";
                    reject(result);
                    return;
                }
                
                const checkData = {
                    user_id: favoriteAddData.user_id,
                    recipe_id: favoriteAddData.recipe_id
                }
                console.log(checkData)

                checkFavoriteExist(checkData).then((checkResult) => {
                    if (checkResult.alreadyAdded === false) {
                        db.query(
                            "INSERT INTO user_recipe SET ?",
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
                        result.err = "此recipe先前已加入資料庫！";
                        reject(result);
                        return;
                    }
                });
            }
        );
    });
};

