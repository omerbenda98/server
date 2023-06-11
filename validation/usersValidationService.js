const config = require("config");
const joiUsersValidation = require("./joi/usersValidation");

const validatorOption = config.get("validatorOption");

const editUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiUsersValidation.validateUserSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  editUserValidation,
};
