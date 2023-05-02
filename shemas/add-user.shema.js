const Joi = require("joi");

const addUserShema = Joi.object({
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
  password: Joi.string().min(8).max(15).required().messages({
    "string.base": `"" should be a type of string`,
    "string.empty": `"" must contain value`,
    "any.required": `"" is a required field`,
  }),
});

const secondEmailShema = Joi.object({
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
});



module.exports = {
  addUserShema,
  secondEmailShema,
};
