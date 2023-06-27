const express = require("express");
const router = express.Router();
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const authValidationService = require("../../validation/authValidationService");
const usersValidationService = require("../../validation/usersValidationService");
const normalizationUserService = require("../../model/usersService/helpers/normalizationUserService");
const chalk = require("chalk");
//get all users
router.get(
  "/",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      const allUsers = await usersServiceModel.getAllUsers();
      res.json(allUsers);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
//get specific user
router.get("/:id", authmw, async (req, res) => {
  try {
    await authValidationService.userIdValidation(req.params.id);
    const userFromDB = await usersServiceModel.getUserById(req.params.id);
    res.json(userFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update user
router.put("/:id", authmw, async (req, res) => {
  try {
    await usersValidationService.editUserValidation(req.body);
    const userFromDB = await usersServiceModel.updateUser(
      req.params.id,
      req.body
    );
    res.json(userFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});
//toggle users isBusiness status
router.patch("/:id/isBusiness", authmw, async (req, res) => {
  try {
    await authValidationService.userIdValidation(req.params.id);
    const userFromDB = await usersServiceModel.getUserById(req.params.id);
    if (!userFromDB) {
      return res.status(404).json({ msg: "User not found" });
    }
    const updatedUser = await usersServiceModel.updateUser(req.params.id, {
      isBusiness: !userFromDB.isBusiness,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});
//delete user
router.delete("/:id", authmw, async (req, res) => {
  try {
    await authValidationService.userIdValidation(req.params.id);
    const userFromDB = await usersServiceModel.deleteUser(req.params.id);
    if (userFromDB) {
      res.json(userFromDB);
    } else {
      res.json({ msg: "could not find the user" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
