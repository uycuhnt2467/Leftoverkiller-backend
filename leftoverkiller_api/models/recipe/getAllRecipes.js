const db = require("../connection_db");

module.exports = function getRecipes() {
    let result = {};
    return new Promise((resolve, reject) => {
        // 找尋
        db.query(
            "SELECT recipe_id, recipe_name, imageURL FROM recipe ",
            function (err, rows) {
                if (err) {
                    result.status = "搜尋失敗。";
                    result.err = "伺服器錯誤，請稍後在試！";
                    reject(result);
                    return;
                }
                result = rows.map((val) => ({
                    recipe_id: val.recipe_id,
                    recipe_name: val.recipe_name,
                    image_url: val.imageURL,
                }));
                result.success = true;
                resolve(result);
            }
        );
    });
};
