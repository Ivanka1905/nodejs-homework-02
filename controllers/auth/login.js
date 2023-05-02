const { UserModel } = require("../../models/user.model");
const bcrypt = require("bcrypt");
const { errorService, createJWT } = require("../../services");
const crypto = require("crypto");
const { addUserShema } = require("../../shemas");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = addUserShema.validate({
    email,
    password,
  });
  if (error) {
    throw errorService(error.message, 400);
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw errorService("Email or password is wrong", 404);
  }
  if (!user.verify) {
    throw errorService("User is not verified", 401);
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    throw errorService("Email or password is wrong", 401);
  }
  const sessionKey = crypto.randomUUID();
  await UserModel.findByIdAndUpdate(user._id, { sessionKey });

  const accessJWT = createJWT({
    userId: String(user._id),
    sessionKey,
  });

  res.json({
    token: accessJWT,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = {
  login,
};
