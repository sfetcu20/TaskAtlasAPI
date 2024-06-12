require('dotenv').config();
const logger = require('../pino');
const createEmail = require('./create-email');
const emailCallback = require('./email-callback');
const postmark = require('postmark');

const sendEmail = async (data) => {
  try {
    const client = new postmark.Client(process.env.POSTMARK_SECRET);
    const payload = await createEmail(data);

    return await client.sendEmail(payload, emailCallback);
  } catch (err) {
    logger.error('Postmark error', err.name, err.message);
  }
};

module.exports = sendEmail;
