const { errorService, sendVerificationLetter } = require("../../services");
const { secondEmailShema } = require("../../shemas");
const { UserModel } = require("../../models/user.model");

const secondTryVerify = async (req, res, next) => {
  const { email } = req.body;

  const { error } = secondEmailShema.validate({ email });
  if (error) {
    console.log(error);
    throw errorService(error.message, 400);
  }

  const newUser = await UserModel.findOne({ email });
  if (!newUser) {
    throw errorService("User is not found", 404);
  }
  if (newUser.verify) {
    throw errorService("Verification has already been passed", 400);
  }

  await sendVerificationLetter(email);
  res.json("Verification email sent");
};

module.exports = {
  secondTryVerify,
};
