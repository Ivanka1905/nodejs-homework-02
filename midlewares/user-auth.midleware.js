const { UserModel } = require("../models/user.model");
const { errorService, verifyJWT } = require("../services");

const userAuthMidleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw errorService("Not authorized", 401);
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw errorService("Not authorized", 401);
    }

    try {
      const tokenPayload = verifyJWT(token);
      if (!tokenPayload.userId || !tokenPayload.sessionKey) {
        throw errorService("Not authorized", 401);
      }
      const user = await UserModel.findById(tokenPayload.userId);

      if (!user) {
        throw errorService("Not authorized", 401);
      }
      if (tokenPayload.sessionKey !== user.sessionKey) {
        throw errorService("Not authorized", 401);
      }

      req.user = user;
      next();
    } catch (e) {
      throw errorService("Not authorized", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userAuthMidleware,
};
