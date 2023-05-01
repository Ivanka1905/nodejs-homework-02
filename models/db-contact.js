const { Schema, model, SchemaTypes } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "users",
    },
  },
  { versionKey: false }
);

const ContactModel = model("contact", contactSchema);

module.exports = {
  ContactModel,
};
