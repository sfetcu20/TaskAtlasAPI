const register = require('./register');
const readOne = require('./read-one');
const readMany = require('./read-many');
const update = require('./update');
const remove = require('./remove');

module.exports = {
  register,
  readMany,
  readOne,
  update,
  remove,
};
