const { error } = require('express-goodies/functions');
const { Post } = require('../../models');

const { postFilter } = require('../../functions/filters');
const { Types } = require('mongoose');

const readMany = async (req, res) => {
  const filter = {
    ...postFilter(req.query),
    client: Types.ObjectId(req.user._id),
  };
  const documents = await Post.find(filter).paginate(req.query);
  if (!documents) {
    throw error(400, 'Error! Posts not found!');
  }

  return res.status(200).json(documents);
};
module.exports = readMany;
