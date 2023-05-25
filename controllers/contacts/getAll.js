const { Contact } = require("../../models/contacts.js");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 1, favorite } = req.query;
  const filter = {};
  if (favorite !== undefined) {
    filter.favorite = favorite;
  }
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, ...filter })
    .skip(Number(skip))
    .limit(Number(limit))
    .populate("owner", " ");

  return res.json(result);
};

module.exports = getAll;
