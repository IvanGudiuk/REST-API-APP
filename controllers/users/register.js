const bcrypt = require("bcrypt");
const { User } = require("../../models/users.js");
const { RequestError } = require("../../helpers/index.js");
const { sendMail } = require("../../helpers/index.js");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  if (user) {
    throw RequestError(409, "Email in use ");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verificationEmail = {
    to: email,
    subject: "Verification email",
    html: `<a target=_blank href='${BASE_URL}/users/auth/verify/${verificationToken}'>verify your email</a>`,
  };

  await sendMail(verificationEmail);

  res.status(201).json({
    user: { email: result.email, subscription: "starter" },
  });
};

module.exports = {
  register,
};
