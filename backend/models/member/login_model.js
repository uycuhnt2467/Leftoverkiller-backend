import db from '../connection_db.js';

export default function memberLogin(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        // 找尋
        db.query(
            "SELECT * FROM accounts WHERE user_name = ? AND hash_password = ?",
            [memberData.user_name, memberData.hash_password],
            function (err, rows) {
                if (err) {
                    console.log("err2")
                    result.status = "登入失敗。";
                    result.err = "伺服器錯誤，請稍後在試！";
                    reject(result);
                    return;
                }
                resolve(rows);
            }
        );
    });
};
