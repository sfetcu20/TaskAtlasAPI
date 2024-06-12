const identitySchemas = require('./identity-schemas');
const postSchemas = require('./post-schemas');
module.exports = {
  ...identitySchemas,
  ...postSchemas,
};
