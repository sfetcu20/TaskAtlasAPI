const mongoose = require('mongoose');
const Identity = require('./identity');

/**
 * Clients post jobs and search for freelancers
 */
const name = 'client';
const schema = new mongoose.Schema({
  jobsPosted: [
    {
      _id: mongoose.Types.ObjectId,
      title: String,
      createdAt: Date,
    },
  ],

 
});

module.exports = Identity.discriminator(name, schema);
