const { ContactModel } = require("../../models/db-contact");

async function getAll(req, res, next) {
  const { page, limit, favorite } = req.query;
  const { _id: owner } = req.user;

  const usersList = favorite ? { owner, favorite } : { owner };

  return res.status(200).json(
    await ContactModel.find(usersList, null, {
      skip: (page - 1) * limit,
      limit,
    })
  );
}

module.exports = {
  getAll,
};
