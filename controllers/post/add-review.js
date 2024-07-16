const { error } = require('express-goodies/functions');
const { Post, Review } = require('../../models');

const readOne = async (req, res) => {
  const payload = { ...req.body };
  const document = await Review.create(payload);
  return res.status(200).json(document);
};
module.exports = readOne;
