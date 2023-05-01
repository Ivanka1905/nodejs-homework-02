const { UserModel } = require("../../models/user.model");
const { createHash, errorService, createJWT } = require("../../services");
const { addUserShema } = require("../../shemas");
const crypto = require("crypto");

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
    const newUser = await UserModel.create({ email, passwordHash }).catch(
      () => {
        throw errorService("Email in use", 409);
      }
    );

    const sessionKey = crypto.randomUUID();
    await UserModel.findByIdAndUpdate(newUser._id, { sessionKey });

    const accessJWT = createJWT({
      userId: String(newUser._id),
      sessionKey,
    });

      res.status(201).json({ token: accessJWT, user: { email, subscription: newUser.subscription } });
  
};

module.exports = {
  register,
};
