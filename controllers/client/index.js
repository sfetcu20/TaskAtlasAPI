const createPost = require('./create-post');
const { readManyAll, readManyPosts, updatePost, readOnePost, removePost } = require('../post');
const chooseFreelancer = require('./choose');
const readMyPosts = require('./read-my-posts');

module.exports = {
  createPost,
  readMyPosts,
  readManyPosts,
  readManyAll,
  updatePost,
  readOnePost,
  removePost,
  chooseFreelancer,
};
