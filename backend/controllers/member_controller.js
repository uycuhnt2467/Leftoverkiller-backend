import jwt from "jsonwebtoken";

import config from "../config/development_config.js";
import Check from "../service/member_check.js";

import toRegister from "../models/member/register_model.js";
import encryption from "../models/member/encryption_model.js";
import loginAction from "../models/member/login_model.js";
import verify from "../models/member/verification_model.js";
import updateAction from "../models/member/update_model.js";

const check = new Check();

export default class Member {
    postRegister(req, res, next) {
        // 進行加密
        const password = encryption(req.body.hash_password);

        // 獲取client端資料
        const memberData = {
            user_name: req.body.username,
            email: req.body.email,
            hash_password: password,
            nick_name: req.body.nickname,
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
            user_name: req.body.username,
            hash_password: password,
            nick_name: "???"
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
                            token:token,
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
                            user_name: req.body.username,
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
