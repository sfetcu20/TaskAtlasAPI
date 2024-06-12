const { Schema, model } = require('mongoose');
const { paginate, reference, validate } = require('express-goodies/mongoose');
const { STATUS_TYPES } = require('../constants');

const name = 'order';
const schema = new Schema(
  {
    identity: reference,
    points: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(STATUS_TYPES),
      default: STATUS_TYPES.PENDING,
    },
    processed: {
      type: Boolean,
      default: false,
    },
    series: {
      type: String,
    },
    number: Number,
    reason: String,
  },
  { timestamps: true }
);

// query for finding the user's active order
schema.query.lastActive = function (userId) {
  return this.where({
    'identity._id': userId,
    expirationDate: { $gt: new Date() },
    status: STATUS_TYPES.APPROVED,
  })
    .sort({ createdAt: -1 })
    .limit(1);
};

// Set schema plugins
schema.plugin(paginate);
schema.plugin(validate);

module.exports = model(name, schema);
