const express = require("express");
const router = express.Router();
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const usersValidationService = require("../../validation/usersValidationService");
const normalizationUserService = require("../../model/usersService/helpers/normalizationUserService");

router.get("/", async (req, res) => {
  try {
    const allUsers = await usersServiceModel.getAllUsers();
    res.json(allUsers);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      //! joi validation
      await usersValidationService.idValidation(req.params.id);
      const userFromDB = await usersServiceModel.getUserById(req.params.id);
      res.json(userFromDB);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// admin or biz owner
router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      //! joi validation
      await usersValidationService.idValidation(req.params.id);
      //! normalize
      req.body = normalizeUser(req.body);
      const userFromDB = await usersServiceModel.updateUser(
        req.params.id,
        req.body
      );
      res.json(userFromDB);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.patch("/:id/isBusiness", async (req, res) => {
  try {
    await usersValidationService.idValidation(req.params.id);
    const userFromDB = await usersServiceModel.updateUser(req.params.id, {
      isBusiness: req.body.isBusiness,
    });
    res.json(userFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.delete(
  "/:id/delete",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      //! joi validation
      await usersValidationService.idValidation(req.params.id);
      const userFromDB = await usersServiceModel.deleteUser(req.params.id);
      if (userFromDB) {
        res.json({ msg: "user deleted" });
      } else {
        res.json({ msg: "could not find the user" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
module.exports = router;
