const { UserModel } = require("../../models/user.model");
const { errorService } = require("../../services");

const updSubscription = async (req, res, next) => {
  const { _id, sessionKey } = req.user;

  const user = await UserModel.findByIdAndUpdate(_id, req.body, { new: true });
  const { subscription } = user;

  if (!sessionKey) {
    throw errorService("Not authorized", 401);
  }
  res.status(201).json({ subscription });
};

module.exports = {
  updSubscription,
};
