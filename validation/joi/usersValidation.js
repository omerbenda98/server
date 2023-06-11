const Joi = require("joi");



const updateUserSchema = Joi.object({
  name: Joi.object()
    .keys({
      firstName: Joi.string().min(2).max(256).optional(),
      middleName: Joi.string().min(2).max(256).optional(),
      lastName: Joi.string().min(2).max(256).optional(),
    })
    .optional(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .optional(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .optional(),
  password: Joi.string()
    .regex(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    )
    .optional(),
  image: Joi.object()
    .keys({
      url: Joi.string()
        .regex(
          new RegExp(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
          )
        )
        .optional(),
      alt: Joi.string().min(2).max(256).optional(),
    })
    .optional(),
  address: Joi.object()
    .keys({
      state: Joi.string().min(2).max(256).optional(),
      country: Joi.string().min(2).max(256).optional(),
      city: Joi.string().min(2).max(256).optional(),
      street: Joi.string().min(2).max(256).optional(),
      houseNumber: Joi.number().min(1).optional(),
      zip: Joi.number().optional(),
    })
    .optional(),
  isAdmin: Joi.boolean().optional(),
  isBusiness: Joi.boolean().optional(),
});

const validateUserSchema = (userInput) => {
  return updateUserSchema.validateAsync(userInput);
};


module.exports = {
  validateUserSchema,
};
