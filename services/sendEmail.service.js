const sgMail = require("@sendgrid/mail");
const { errorService } = require("./error.service");
const { UserModel } = require("../models/user.model");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { SENDGRID_SENDER_MAIL } = process.env;

const sendVerificationLetter = async (email) => {
  const findToken = await UserModel.findOne({ email });
  const token = findToken.verificationToken;

  try {
    const way = `http://localhost:3000/users/verify/${token}`;
    const msg = {
      to: email,
      from: SENDGRID_SENDER_MAIL,
      subject: "Need verification",

      html: `<a href=${way}>Click here to verify your email</a>`,
    };

    await sgMail.send(msg);
  } catch (error) {
    throw errorService("Sending verification letter failed", 502);
  }
};

module.exports = {
  sendVerificationLetter,
};
