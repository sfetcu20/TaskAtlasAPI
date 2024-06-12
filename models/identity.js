const mongoose = require('mongoose');
const { hashPasswords, paginate, validate } = require('./plugins');
const { review } = require('./schemas');

/**
 * Identities manage login related operations
 */
const name = 'identity';
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    lastCoordonates: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    reviews: [review],
    avatar: {
      type: Buffer,
    },
    locations: {
      type: [String],
      required: true,
    },
    retries: {
      type: Number,
      default: 0,
    },
    coins: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
    },
    description: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    confirmedAt: {
      type: Date,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

schema.plugin(hashPasswords);
schema.plugin(paginate);
schema.plugin(validate);

module.exports = mongoose.model(name, schema);
