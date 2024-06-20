import db from "../connection_db.js";
import checkPantryExist from "./checkPantryExist.js";

export default function addIngredientToPantry(pantryAddData) {
    let result = {};
    return new Promise((resolve, reject) => {
        checkPantryExist(pantryAddData.ingredient_id).then((checkResult) => {
            if (checkResult.alreadyAdded === false) {
                db.query(
                    "INSERT INTO user_ingredient SET ?",
                    pantryAddData,
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
    });
};
