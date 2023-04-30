const { UserModel } = require("../../models/user.model");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      const err = new Error("Email or password is wrong");
      err.code = 404;
      throw err;
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      res.status(401).json("Email or password is wrong");
      return;
    }
    res.json({ token: "sfcgv" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
