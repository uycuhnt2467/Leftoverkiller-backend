const jwt = require("jsonwebtoken");

const config = require("../config/development_config");
const Check = require("../service/member_check");

const toRegister = require("../models/register_model");
const encryption = require("../models/encryption_model");
const loginAction = require("../models/login_model");
const verify = require("../models/verification_model");
const updateAction = require("../models/update_model");

check = new Check();

module.exports = class Member {
    postRegister(req, res, next) {
        // 進行加密
        const password = encryption(req.body.hash_password);

        // 獲取client端資料
        const memberData = {
            username: req.body.username,
            email: req.body.email,
            hash_password: password,
            nickname: req.body.nickname,
        };
        const checkEmail = check.checkEmail(memberData.email);
        // 不符合email格式
        if (checkEmail === false) {
            res.json({
                result: {
                    status: "註冊失敗。",
                    err: "請輸入正確的Eamil格式。(如1234@email.com)",
                },
            });
            // 若符合email格式
        } else if (checkEmail === true) {
            // 將資料寫入資料庫
            toRegister(memberData).then(
                (result) => {
                    // 若寫入成功則回傳
                    res.json({
                        result: result,
                    });
                },
                (err) => {
                    // 若寫入失敗則回傳
                    res.json({
                        err: err,
                    });
                }
            );
        }
    }
    postLogin(req, res, next) {
        // 進行加密
        const password = encryption(req.body.hash_password);

        // 獲取client端資料
        const memberData = {
            username: req.body.username,
            hash_password: password,
        };

        loginAction(memberData)
            .then((rows) => {
                if (check.checkNull(rows) === true) {
                    res.json({
                        result: {
                            status: "登入失敗。",
                            err: "請輸入正確的帳號或密碼。",
                        },
                    });
                } else if (check.checkNull(rows) === false) {
                    // 產生token

                    const token = jwt.sign(
                        {
                            algorithm: "HS256",
                            exp: Math.floor(Date.now() / 1000) + 60 * 60, // token一個小時後過期。
                            data: rows[0].user_id,
                        },
                        config.secret
                    );

                    res.setHeader("token", token);
                    res.json({
                        result: {
                            status: "登入成功。",
                            loginMember:
                                "歡迎 " + rows[0].username + " 的登入！",
                        },
                    });
                }
            })
            .catch(() => console.log("err"));
    }
    putUpdate(req, res, next) {
        console.log("here");
        const token = req.headers["token"];
        //確定token是否有輸入
        if (check.checkNull(token) === true) {
            res.json({
                err: "請輸入token！",
            });
        } else if (check.checkNull(token) === false) {
            verify(token)
                .then((tokenResult) => {
                    console.log("result");
                    console.log(tokenResult);
                    if (tokenResult === false) {
                        console.log("false");
                        res.json({
                            result: {
                                status: "token錯誤。",
                                err: "請重新登入。",
                            },
                        });
                    } else {
                        const id = tokenResult;

                        // 進行加密
                        const password = encryption(req.body.hash_password);

                        const memberUpdateData = {
                            username: req.body.username,
                            hash_password: password,
                            // update_date: onTime(),
                        };
                        updateAction(id, memberUpdateData).then(
                            (result) => {
                                res.json({
                                    result: result,
                                });
                            },
                            (err) => {
                                res.json({
                                    result: err,
                                });
                            }
                        );
                    }
                })
                .catch(() => console.log("err"));
        }
    }
};

//取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [
        date.getFullYear(),
        "-" + (mm > 9 ? "" : "0") + mm,
        "-" + (dd > 9 ? "" : "0") + dd,
        " " + (hh > 9 ? "" : "0") + hh,
        ":" + (mi > 9 ? "" : "0") + mi,
        ":" + (ss > 9 ? "" : "0") + ss,
    ].join("");
};
