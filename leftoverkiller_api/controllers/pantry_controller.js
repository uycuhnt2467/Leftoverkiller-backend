const jwt = require("jsonwebtoken");

const config = require("../config/development_config");
const Check = require("../service/member_check");

const verify = require("../models/member/verification_model");
const addIngredient = require("../models/pantry/addIngredient_model");
const addIngredientByID = require("../models/pantry/addIngredientByID")
const getAllPantry = require("../models/pantry/getAllPantry");
const deleteIngredientFromPantry = require("../models/pantry/deleteIngredientFromPantry");

check = new Check();

module.exports = class Pantry {
    postAddIngredientByName(req, res, next) {
        const token = req.headers["token"];
        if (check.checkNull(token) === true) {
            res.json({
                result: {
                    success: false,
                    isLogged: false,
                    err: "請輸入token！",
                },
            });
        } else if (check.checkNull(req.body.ingredient_name) === true) {
            res.json({
                result: {
                    success: false,
                    isLogged: false,
                    err: "請輸入至少一種材料！",
                },
            });
        } else if (check.checkNull(token) === false) {
            verify(token)
                .then((tokenResult) => {
                    if (tokenResult === false) {
                        res.json({
                            result: {
                                success: false,
                                isLogged: false,
                                status: "token錯誤。",
                                err: "請重新登入。",
                            },
                        });
                    } else {
                        const pantryAddData = {
                            user_id: tokenResult,
                            ingredient_name: req.body.ingredient_name,
                        };
                        addIngredient(pantryAddData).then(
                            (result) => {
                                res.json({
                                    result: { ...result, success: true },
                                });
                            },
                            (err) => {
                                res.json({
                                    result: { ...err, success: false },
                                });
                            }
                        );
                    }
                })
                .catch(() => console.log("err"));
        }
    }

    postAddIngredientByID (req, res, next) {
        const token = req.headers["token"];
        if (check.checkNull(token) === true) {
            res.json({
                result: {
                    success: false,
                    isLogged: false,
                    err: "請輸入token！",
                },
            });
        } else if (check.checkNull(req.body.ingredient_id) === true) {
            res.json({
                result: {
                    success: false,
                    isLogged: false,
                    err: "請輸入至少一種材料！",
                },
            });
        } else if (check.checkNull(token) === false) {
            verify(token)
                .then((tokenResult) => {
                    if (tokenResult === false) {
                        res.json({
                            result: {
                                success: false,
                                isLogged: false,
                                status: "token錯誤。",
                                err: "請重新登入。",
                            },
                        });
                    } else {
                        const pantryAddData = {
                            user_id: tokenResult,
                            ingredient_id: req.body.ingredient_id,
                        };
                        addIngredientByID(pantryAddData).then(
                            (result) => {
                                res.json({
                                    result: { ...result, success: true },
                                });
                            },
                            (err) => {
                                res.json({
                                    result: { ...err, success: false },
                                });
                            }
                        );
                    }
                })
                .catch(() => console.log("err"));
        }
    }
    getAcquireAllPantry(req, res, next) {
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
                        const pantryGetData = {
                            user_id: tokenResult,
                        };
                        getAllPantry(pantryGetData).then(
                            (result) => {
                                res.json({
                                    result: { ...result, success: true },
                                });
                            },
                            (err) => {
                                res.json({
                                    result: { ...err, success: false },
                                });
                            }
                        );
                    }
                })
                .catch(() => console.log("err"));
        }
    }

    deleteRemoveIngredient(req, res, next) {
        const token = req.headers["token"];
        if (check.checkNull(token) === true) {
            res.json({
                result: {
                    success: false,
                    err: "請輸入token！",
                },
            });
        } else if (check.checkNull(req.body.ingredient_id) == true) {
            res.json({
                result: {
                    success: false,
                    err: "請輸入要刪除的ingredient！",
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
                        const pantryDeleteData = {
                            user_id: tokenResult,
                            ingredient_id: req.body.ingredient_id,
                        };
                        console.log("here");
                        deleteIngredientFromPantry(pantryDeleteData).then(
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
