const express = require("express");
const router = express.Router();

const authRouter = require("./api/auth");
const cardsRouter = require("./api/cards");
const usersRouter = require("./api/users");

//http://localhost:8181/api/register
router.get("/register", (req, res) => {
  res.json({ msg: "register" });
});

//http://localhost:8181/api/auth/
router.use("/auth", authRouter);

//http://localhost:8181/api/cards
router.use("/cards", cardsRouter);

//http://localhost:8181/api/users
router.use("/users", usersRouter);

module.exports = router;
