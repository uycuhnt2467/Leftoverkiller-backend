const db = require("../connection_db");

module.exports = function getAllIngredients() {
    let result = {};
    return new Promise((resolve, reject) => {
        // 找尋
        db.query("SELECT * FROM ingredient ", function (err, rows) {
            if (err) {
                result.success = false;
                result.status = "搜尋材料失敗。";
                result.err = "伺服器錯誤，請稍後在試！";
                reject(result);
                return;
            }
            const process = rows.map((val) => {
                return {
                    success: true,
                    ingredient_id: val.ingredient_id,
                    ingredient_name: val.ingredient_name,
                    image_url: val.imageURL,
                };
            });

            resolve(process);
        });
    });
};
