const { User } = require("../../models/users.js");
const { RequestError } = require("../../helpers/index.js");

const verification = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw RequestError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).send({ message: "Verification successful" });
};

module.exports = { verification };
