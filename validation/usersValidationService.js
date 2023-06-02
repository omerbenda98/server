const config = require("config");
const joiUsersValidation = require("./joi/usersValidation");

const validatorOption = config.get("validatorOption");

const idValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiUsersValidation.validateIdSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  idValidation,
};
