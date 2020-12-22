const db = require("../connection_db");

module.exports = function getOneIngredient(queryData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // 找尋
        db.query(
            "SELECT * FROM ingredient where ingredient_id=?",
            [queryData.ingredient_id],
            function (err, rows) {
                if (err) {
                    result.status = "搜尋材料失敗。";
                    result.err = "伺服器錯誤，請稍後在試！";
                    reject(result);
                    return;
                }
                const process = {
                    ingredient_id: rows[0].ingredient_id,
                    ingredient_name: rows[0].ingredient_name,
                    image_url: rows[0].imageURL,
                };

                result = {...process}
            }
        );
    });
};
