const { error } = require('../../functions');
const { User } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  const identity = await User.findOne({ _id: id });
  if (!identity) {
    throw error(404, 'Account not found');
  }
  return res.status(200).json(identity);
};
