const createPost = require('./create-post');
const { readManyAll, readManyPosts } = require('../post');

module.exports = {
  createPost,
  readManyPosts,
  readManyAll,
};
