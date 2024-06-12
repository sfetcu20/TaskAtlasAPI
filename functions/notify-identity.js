/* eslint-disable no-console */

const crypto = require('crypto');
const { Confirm } = require('../models');
const { sendEmail } = require('../lib/postmark');

const templates = {
  confirmEmail: ({ link, name, email }) => ({
    data: {
      team: process.env.TEAM_NAME,
      title: 'Account Activation',
      link,
      name,
    },
    name: 'Account Activation',
    to: email,
    type: 'confirm',
  }),
};
const confirmEmail = async ({ id, email, ...data }) => {
  try {
    const hash = crypto.createHash('sha256').update(id.toString()).digest('hex');
    const link = `${process.env.APP_BASE_URL}/confirm/${hash}`;

    await sendEmail(templates.confirmEmail({ link, email, ...data }));

    await Confirm.create({
      hash,
      identity: id,
      expirationDate: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    console.log(`Signup email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending signup email: ${error.message}`);
  }
};

module.exports = {
  confirmEmail,
};
