const register = require('./register');
const readOne = require('./read-one');
const readMany = require('./read-many');
const update = require('./update');
const remove = require('./remove');
const apply = require('./apply');
const readMyPosts = require('./read-my-posts');
const completeJob = require('./complete-job');

const { readOnePost, createReview } = require('../post');
module.exports = {
  register,
  readMany,
  readOne,
  completeJob,
  update,
  apply,
  remove,
  readOnePost,
  createReview,
  readMyPosts,
};
