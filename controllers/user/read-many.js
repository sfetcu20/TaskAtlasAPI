const { error } = require('../../functions');
const { User } = require('../../models');
const { userFilter } = require('../../functions/filters');
module.exports = async (req, res) => {
  const filter = userFilter(req.query);

  const documents = await User.find(filter).paginate(req.query);
  if (!documents) {
    throw error(404, 'Accounts not found');
  }
  return res.status(200).json(documents);
};
