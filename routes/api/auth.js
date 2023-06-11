const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../../validation/authValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");

//http://localhost:8181/api/auth/register
router.post("/register", async (req, res) => {
  try {
    await registerUserValidation(req.body);
    const existingUser = await usersServiceModel.getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ msg: "email already taken" });
    }

    req.body.password = await hashService.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await usersServiceModel.registerUser(req.body);
    res.json({ msg: "user registered successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/auth/login
router.post("/login", async (req, res) => {
  try {
    /**
     * *joi
     * *get user from database
     * *check password
     * *create token
     * *send to user
     */
    await loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("invalid email and/or password");
    const isPasswordMatch = await hashService.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch)
      throw new CustomError("invalid email and/or password");
    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
