const { UserModel } = require("../../models/user.model");
const { errorService } = require("../../services");

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  console.log(req.params);
  const user = await UserModel.findOne({ verificationToken });
  console.log(user);
  if (!user) {
    throw errorService("User not found", 404);
  }

  await UserModel.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({ message: "Verification successful" });
};

module.exports = {
  verifyEmail,
};
