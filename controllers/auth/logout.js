const { UserModel } = require("../../models/user.model");
const { errorService } = require("../../services");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  const user = await UserModel.findByIdAndUpdate(_id, { sessionKey: null });
  if (!user) {
    throw errorService("Not authorized", 401);
  }
  res.status(204).json();
};

module.exports = {
  logout,
};
