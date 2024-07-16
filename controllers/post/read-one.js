const { error } = require('express-goodies/functions');
const { Post, Review } = require('../../models');

const readOne = async (req, res) => {
  const document = await Post.findById(req.params.id).populate('client').lean();
  if (!document) {
    throw error(400, 'Error! Posts not found!');
  }
  const reviews = await Review.find({ post: document._id }).populate('author to').lean();

  document.reviews = reviews;

  if (document.client._id.toString() != req.user._id.toString() && req.query.type == 'view') {
    await Post.findByIdAndUpdate(document._id, { times_viewed: document.times_viewed + 1 });
  }
  console.log(document);
  return res.status(200).json(document);
};
module.exports = readOne;
