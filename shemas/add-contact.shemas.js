const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": `"" should be a type of string`,
    "string.empty": `"" must contain value`,
    "any.required": `"" is a required field`,
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "uk"] },
    })
    .required()
    .messages({
      "string.base": `"" should be a type of string`,
      "string.empty": `"" must contain value`,
      "any.required": `"" is a required field`,
    }),
  phone: Joi.string().min(5).max(13).required().messages({
    "string.base": `"" should be a type of string`,
    "string.empty": `"" must contain value`,
    "any.required": `"" is a required field`,
  }),
  favorite: Joi.boolean(),
});

module.exports = {
  addContactSchema,
};
