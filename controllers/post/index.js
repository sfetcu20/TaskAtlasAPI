const readManyPosts = require('./read-many');
const readManyAll = require('./read-many-all');
const updatePost = require('./update');
const readOnePost = require('./read-one');
const removePost = require('./remove-post');
const createReview = require('./add-review');

module.exports = {
  readManyPosts,
  readManyAll,
  updatePost,
  readOnePost,
  removePost,
  createReview,
};
