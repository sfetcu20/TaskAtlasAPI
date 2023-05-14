const bcrypt = require('bcryptjs');
const { error } = require('../../functions');
const { Identity, User } = require('../../models');

module.exports = async (req, res) => {
  const { email, password, locations } = req.body;
  if (!email || !password || !locations) {
    throw error(400, 'Missing required params');
  }

  const identity = await Identity.findOne({ email }).lean();
  if (identity) {
    throw error(400, 'Your email is already registered');
  }

  const payload = {
    ...req.body,
    confirmed: false,
    role: 'user',
    password: bcrypt.hashSync(password),
  };

  const document = await User.create(payload);
  if (!document) {
    throw error(400, 'Document could not be created');
  }
  //TO DO:verify coordonates with the locations array
  //TO DO:send confirmation email

  return res.status(200).json({ document, message: 'Registration successful' });
};
