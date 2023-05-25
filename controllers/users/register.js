const bcrypt = require("bcrypt");
const { User } = require("../../models/users.js");
const { RequestError } = require("../../helpers/index.js");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);

  if (user) {
    throw RequestError(409, "Email in use ");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    user: { email: result.email, subscription: "starter" },
  });
};

module.exports = {
  register,
};
