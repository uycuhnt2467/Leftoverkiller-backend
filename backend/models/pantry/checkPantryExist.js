import db from "../connection_db.js";

export default function checkPantryExist(QueryData) {
    const result = {};
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM user_ingredient WHERE user_id = ? and ingredient_id = ?",
            [QueryData.user_id, QueryData.ingredient_id],
            function (err, rows) {
                // 若資料庫部分出現問題，則回傳給client端「伺服器錯誤，請稍後再試！」的結果。
                if (err) {
                    console.log(err);
                    result.status = "查詢失敗。";
                    result.err = "伺服器錯誤，請稍後在試！";
                    reject(result);
                    return;
                }
                if (rows.length == 0) {
                    console.log("check here");
                    result.alreadyAdded = false;
                    resolve(result);
                } else {
                    result.alreadyAdded = true;
                    resolve(result);
                }
            }
        );
    });
};
