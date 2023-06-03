const { User } = require("../../models/users.js");
const { RequestError } = require("../../helpers/index.js");
const { sendMail } = require("../../helpers/index.js");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw RequestError(400);
  }

  const user = await User.findOne({ email });
  const { verificationToken } = user;

  const verificationEmail = {
    to: email,
    subject: "Verification email",
    html: `<a target=_blank href='${BASE_URL}/users/auth/verify/${verificationToken}'>verify your email</a>`,
  };

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  await sendMail(verificationEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = { resendVerify };
