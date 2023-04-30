const { UserModel } = require("../../models/user.model");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const newUser = await UserModel.create({ email, passwordHash }).catch(
      () => {
        const err = new Error("Email in use");
        err.code = 409;
        throw err;
      }
      );
    //   TODO: добавити поля, які треба повернути
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
