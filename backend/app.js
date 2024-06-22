import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { fileURLToPath } from 'url';
import config from './config/development_config.js';

// import indexRouter from "./routes/index";
// import usersRouter from "./routes/users";
import memberRouter from "./routes/member.js";
import recipeRouter from "./routes/recipe.js";
import ingredientRouter from "./routes/ingredient.js";
import pantryRouter from "./routes/pantry.js";
import favoriteRouter from "./routes/favorite.js";
import checkLogRouter from "./routes/checkLog.js";
import searchRouter from "./routes/search.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));
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

// app.listen(3003, "127.0.0.1", () => console.log("Server running on host 127.0.0.1 port 3001 ccc")); // local
// app.listen(3001, "0.0.0.0", () => console.log("Server running on host 0.0.0.0 port 3001")); // docker
app.listen(config.server.port, config.server.host, () => console.log(`Server running on host ${config.server.host}, port ${config.server.port}`))

export default app;
