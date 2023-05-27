const Jimp = require("jimp");
const path = require("path");
const { User } = require("../../models/users.js");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const avatarUpload = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;
  const resultUpload = path.join(avatarsDir, filename);
  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250).writeAsync(resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = { avatarUpload };
