const { error } = require('../../functions');
const { User } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  const identity = await User.findByIdAndDelete(id);
  if (!identity) {
    throw error(400, 'Account could not be deleted');
  }
  return res.status(200).json({ identity, message: 'Account has been deleted' });
};
