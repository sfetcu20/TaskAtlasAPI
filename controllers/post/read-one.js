const { error } = require('express-goodies/functions');
const { Post } = require('../../models');

const readOne = async (req, res) => {
  const document = await Post.findById(req.params.id).populate('client');
  if (!document) {
    throw error(400, 'Error! Posts not found!');
  }
  if (document.client._id.toString() != req.user._id.toString() && req.query.type == 'view') {
    document.times_viewed = document.times_viewed + 1;
    document.save();
  }
  return res.status(200).json(document);
};
module.exports = readOne;
