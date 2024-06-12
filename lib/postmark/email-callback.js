const logger = require('../pino');

/**
 * @see https://github.com/wildbit/postmark.js/wiki/Getting-Started
 */
const emailCallback = (err = {}, res = {}) => {
  if (err) {
    logger.error(`Postmark error`, err);
    console.error(err);
    return;
  }
  if ('To' in res) {
    logger.info(`sending an email with postmark to ${res.To}`);
  }
};

module.exports = emailCallback;
