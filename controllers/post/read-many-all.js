const { error } = require('express-goodies/functions');
const { Post } = require('../../models');

const { postFilter } = require('../../functions/filters');

const readManyAll = async (req, res) => {
  const filter = {
    ...postFilter(req.query),
  };
  const documents = await Post.find(filter).populate('client').paginate(req.query);
  if (!documents) {
    throw error(400, 'Error! Posts not found!');
  }

  return res.status(200).json(documents);
};
module.exports = readManyAll;
