const IdentityEnums = require('./identity');
const OrderEnums = require('./order');
const JobEnums = require('./job');

module.exports = {
  ...IdentityEnums,
  ...OrderEnums,
  ...JobEnums,
};
