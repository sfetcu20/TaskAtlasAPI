const { Types } = require('mongoose');

module.exports = {
  client: { type: Types.ObjectId },
  comment: { type: String },
  rating: { type: Number },
  timestamps: {
    type: Date,
    default: new Date(),
  },
};
