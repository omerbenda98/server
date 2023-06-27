const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const apiRouter = require("./routes/api");
const config = require("config");
const initialData = require("./initialData/initialData");
const chalk = require("chalk");

const app = express();

console.log("file", config.get("file"));

app.use(cors());

app.use(
  logger(function (tokens, req, res) {
    const status = tokens.status(req, res);
    var color =
      status >= 500
        ? "red"
        : status >= 400
        ? "yellow"
        : status >= 300
        ? "cyan"
        : status >= 200
        ? "green"
        : "gray";

    return chalk[color](
      [
        tokens.date(req, res, "clf"),
        tokens.method(req, res),
        tokens.url(req, res),
        status,
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ")
    );
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).send({
    status: 500,
    message: err.message || "Internal Server Error",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/admin", express.static(path.join(__dirname, "admin")));

initialData();
app.use("/api", apiRouter);
app.use((req, res, next) => {
  res.status(404).json({ err: "page not found" });
});

module.exports = app;
