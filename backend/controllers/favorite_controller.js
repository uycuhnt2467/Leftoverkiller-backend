import Check from "../service/member_check.js"

import verify from "../models/member/verification_model.js"

import addFavoriteRecipe from "../models/favorite/addFavoriteRecipe.js"
import getAllFavoriteRecipe from "../models/favorite/getAllFavoriteRecipe.js"
import deleteRecipeFromFavorite from "../models/favorite/deleteRecipeFromFavorite.js"

const check = new Check();

export default class Favorite {
    getAcquireAllFavorite(req, res, next) {
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
                        const favoriteGetData = {
                            user_id: tokenResult,
                        };
                        getAllFavoriteRecipe(favoriteGetData).then(
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
    postAddFavorite(req, res, next) {
        const token = req.headers["token"];
        if (check.checkNull(token) === true) {
            res.json({
                result: {
                    success: false,
                    isLogged: false,
                    err: "請先登入！",
                },
            });
        } else if (check.checkNull(req.body.recipe_id) === true) {
            res.json({
                result: {
                    success: false,
                    err: "請輸入至少一種recipe！",
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
                        const favoriteAddData = {
                            user_id: tokenResult,
                            recipe_id: req.body.recipe_id,
                        };
                        addFavoriteRecipe(favoriteAddData).then(
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
    deleteRemoveFavorite(req, res, next) {
        const token = req.headers["token"];
        if (check.checkNull(token) === true) {
            res.json({
                result: {
                    success: false,
                    err: "請輸入token！",
                },
            });
        } else if (check.checkNull(req.body.recipe_id) == true) {
            res.json({
                result: {
                    success: false,
                    err: "請輸入要刪除recipe！",
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
                        const favoriteDeleteData = {
                            user_id: tokenResult,
                            recipe_id: req.body.recipe_id,
                        };
                        console.log("here");
                        deleteRecipeFromFavorite(favoriteDeleteData).then(
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
