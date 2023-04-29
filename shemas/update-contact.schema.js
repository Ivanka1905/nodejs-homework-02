const Joi = require("joi");

const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "org", "uk"] },
  }),
  phone: Joi.string().min(5).max(13),
  favorite: Joi.boolean(),
})
  .min(1)
  .required();

module.exports = {
  updateContactSchema,
};
