const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cardsService/cardsService");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");
const cardsValidationService = require("../../validation/cardsValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const authmw = require("../../middleware/authMiddleware");
const authValidationService = require("../../validation/authValidationService");

// create card
router.post(
  "/",
  authmw,
  permissionsMiddleware(true, false, false),
  async (req, res) => {
    try {
      await cardsValidationService.createCardValidation(req.body);
      let normalCard = await normalizeCard(req.body, req.userData._id);
      const dataFromMongoose = await cardsServiceModel.createCard(normalCard);
      res.json(dataFromMongoose);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// get all cards
router.get("/", async (req, res) => {
  try {
    const allCards = await cardsServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});
// get specific card
router.get("/my-cards", authmw, async (req, res) => {
  try {
    const myCards = await cardsServiceModel.getMyCards(req.userData._id);
    res.json(myCards);
  } catch (err) {
    res.status(400).json(err);
  }
});
// get specific card
router.get("/:id", async (req, res) => {
  try {
    await authValidationService.userIdValidation(req.params.id);
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    res.json(cardFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update card
router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      //! joi validation
      await cardsValidationService.editCardValidation(req.body);
      let normalCard = await normalizeCard(req.body, req.userData._id);
      let updatedCard = await cardsServiceModel.updateCard(
        req.params.id,
        normalCard
      );
      res.json(updatedCard);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.patch("/card-like/:id", authmw, async (req, res) => {
  try {
    //joi
    // await usersValidationService.idValidation(req.params.id);
    const userId = req.userData._id;
    await cardsServiceModel.addLike(req.params.id, userId);
    res.json({ msg: "card like added/removed" });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// admin or biz owner
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      //! joi validation
      const cardFromDB = await cardsServiceModel.deleteCard(req.params.id);
      if (cardFromDB) {
        res.json({ msg: "card deleted" });
      } else {
        res.json({ msg: "could not find the card" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
