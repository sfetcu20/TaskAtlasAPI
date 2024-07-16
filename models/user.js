const mongoose = require('mongoose');
const Identity = require('./identity');
const { EDUCATION_ENUM, WORK_PREFERENCE_ENUM } = require('../constants');

/**
 * Users are freelancers who can apply for jobs
 */
const name = 'user';
const schema = new mongoose.Schema({
  skills: {
    type: [String],
  },
  preferences: {
    type: [String],
    enum: Object.values(WORK_PREFERENCE_ENUM),
  },
  completedTasks: {
    type: Number,
    default: 0,
  },
  jobHistory: [
    {
      _id: mongoose.Types.ObjectId,
      client: mongoose.Types.ObjectId,
      title: String,
      duration: Number,
      skillsRequired: [String],
    },
  ],
  highestEducation: {
    type: String,
    enum: EDUCATION_ENUM,
  },
  certifications: {
    type: [String],
  },
  experience: {
    type: Number,
    set: (v) => Number(v),
  },
});

module.exports = Identity.discriminator(name, schema);
