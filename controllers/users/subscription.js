const { User } = require("../../models/users.js");

const subscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { subscription };
