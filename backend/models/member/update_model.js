const db = require('../connection_db');

module.exports = function customerEdit(id, memberUpdateData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('UPDATE accounts SET ? WHERE user_id = ?', [memberUpdateData, id], function (err, rows) {
            if (err) {
                console.log(err);
                result.status = "會員資料更新失敗。"
                result.err = "伺服器錯誤，請稍後在試！"
                reject(result);
                return;
            }
            result.status = "會員資料更新成功。"
            result.memberUpdateData = memberUpdateData
            resolve(result)
        })
    })
}