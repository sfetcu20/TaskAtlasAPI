const register = require('./register');
const readOne = require('./read-one');
const readMany = require('./read-many');
const update = require('./update');
const remove = require('./remove');
const apply = require('./apply');

const { readOnePost } = require('../post');
module.exports = {
  register,
  readMany,
  readOne,
  update,
  apply,
  remove,
  readOnePost,
};
