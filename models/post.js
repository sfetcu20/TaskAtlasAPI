const mongoose = require('mongoose');
const { WORK_PREFERENCE_ENUM, JOB_STATUS } = require('../constants');
const { reference } = require('express-goodies/mongoose');

/**
 Posts store the details of the task to be completed
 */
const name = 'post';
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    coordinates: {
      lat: String,
      lon: String,
    },
    address: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values(WORK_PREFERENCE_ENUM),
    },
    budget: {
      type: Number,
    },
    startDate: {
      type: Date,
      set: (v) => new Date(v),
    },
    endDate: {
      type: Date,
      set: (v) => new Date(v),
    },
    status: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.OPEN,
    },
    client: reference,
    user: reference,
    skillsRequired: [String],
    education: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(name, schema);