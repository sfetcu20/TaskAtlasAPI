const { error } = require('express-goodies/functions');
const { Post } = require('../../models');
const { validate } = require('express-goodies/middleware');

const { createPostSchema } = require('../../schemas/post-schemas');

const middlewares = [validate(createPostSchema)];

const createPost = async (req, res) => {
  const payload = { ...req.body, client: { _id: req.user.me, name: req.user.name } };

  const document = await Post.create(payload);
  if (!document) {
    throw error(400, 'Error! Post could not be created');
  }

  return res.status(200).json({ data: document, message: 'Post created succesfully' });
};
module.exports = [...middlewares, createPost];
