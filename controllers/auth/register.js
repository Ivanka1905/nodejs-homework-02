const { UserModel } = require("../../models/user.model");
const {
  createHash,
  errorService,
  createJWT,
  sendVerificationLetter,
} = require("../../services");
const { addUserShema } = require("../../shemas");
const crypto = require("crypto");
const { nanoid } = require("nanoid");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = addUserShema.validate({
    email,
    password,
  });
  if (error) {
    throw errorService(error.message, 400);
  }
  const passwordHash = await createHash(password);
  const verificationToken = nanoid();
  const avatarUrl = gravatar.url(email);
  const newUser = await UserModel.create({
    avatarUrl,
    email,
    passwordHash,
    verificationToken,
  }).catch(() => {
    throw errorService("Email in use", 409);
  });

  const sessionKey = crypto.randomUUID();

  await UserModel.findByIdAndUpdate(newUser._id, {
    sessionKey,
  });

  const accessJWT = createJWT({
    userId: String(newUser._id),
    sessionKey,
  });

  await sendVerificationLetter(email);
  res.status(201).json({
    token: accessJWT,
    user: { email, subscription: newUser.subscription },
  });

};

module.exports = {
  register,
};
