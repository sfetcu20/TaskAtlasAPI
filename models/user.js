const mongoose = require('mongoose');
const Identity = require('./identity');

/**
 * Admins are identities who have extended permissions
 */
const name = 'user';
const schema = new mongoose.Schema({
  skills: {
    type: [String],
  },
  preferences: {
    type: [String],
  },
  coins: {
    type: Number,
    default: 0,
  },
  completedTasks: {
    type: Number,
    default: 0,
  },
});

module.exports = Identity.discriminator(name, schema);
