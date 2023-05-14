const { error } = require('../../functions');
const { User } = require('../../models');

module.exports = async (req, res) => {
  const { email, locations, name } = req.body;
  const { id } = req.params;
  if (!email || !name || !locations) {
    throw error(400, 'Missing required params');
  }
  delete req.body.role;
  delete req.body.password;
  delete req.body.__t;
  delete req.body.coins;
  delete req.body.completedTasks;

  const identity = await User.findOne({ _id: id }).lean();
  if (!identity) {
    throw error(404, 'Account not found');
  }

  const document = await User.updateOne(req.body);
  if (!document) {
    throw error(400, 'Document could not be created');
  }
  //TO DO:send confirmation email

  return res.status(200).json({ document, message: 'Account has been updated' });
};
