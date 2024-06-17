var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors")

// var indexRouter = require('./routes/index');
// var usersRouter = require("./routes/users");
var memberRouter = require("./routes/member");
var recipeRouter = require("./routes/recipe");
var ingredientRouter = require("./routes/ingredient");
var pantryRouter = require("./routes/pantry");
var favoriteRouter = require("./routes/favorite");
var checkLogRouter = require("./routes/checkLog");
var searchRouter = require("./routes/search")

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())
app.options("*", cors())

// app.use('/', indexRouter);
app.use("/", memberRouter);
app.use("/recipe/", recipeRouter);
app.use("/ingredient/", ingredientRouter);
app.use("/pantry/", pantryRouter);
app.use("/favorite/", favoriteRouter);
app.use("/checkLog/", checkLogRouter);
app.use("/search/", searchRouter)

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(3001, () => console.log("Server running on port 3001"));

module.exports = app;
