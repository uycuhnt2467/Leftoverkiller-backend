import Check from "../service/member_check.js";

import verify from "../models/member/verification_model.js";

const check = new Check();

export default class Favorite {
    getCheckLog(req, res, next) {
        const token = req.headers["token"];
        if (check.checkNull(token) === true) {
            res.json({
                result: {
                    success: false,
                    err: "請輸入token！",
                },
            });
        } else if (check.checkNull(token) === false) {
            verify(token)
                .then((tokenResult) => {
                    if (tokenResult === false) {
                        res.json({
                            result: {
                                success: false,
                                status: "token錯誤。",
                                err: "請重新登入。",
                            },
                        });
                    } else {
                        res.json({
                            result: { success: true },
                        });
                    }
                })
                .catch(() => console.log("err"));
        }
    }
};
