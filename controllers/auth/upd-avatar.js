const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { UserModel } = require("../../models/user.model");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updAvatar = async (req, res, next) => {
  const { _id } = req.user;
  console.log(req.file);
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join("avatars", filename);
  const smallAvatar = path.join("public", "avatars", filename);
  Jimp.read(smallAvatar, (err, filename) => {
    if (err) throw err;
    filename.cover(250, 250).quality(60).write(smallAvatar);
  });

  await UserModel.findByIdAndUpdate(_id, { avatarUrl: smallAvatar });
  res.status(200).json({ avatarUrl });
};

module.exports = {
  updAvatar,
};
