const config = require("config");
const joiCardsValidation = require("./joi/cardsValidation");

const validatorOption = config.get("validatorOption");

const createCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateCardSchema(userInput);
  }
  throw new Error("validator undefined");
};
const editCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateEditCardSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  createCardValidation,
  editCardValidation,
};
