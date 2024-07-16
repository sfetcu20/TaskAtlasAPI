const mongoose = require('mongoose');

/**
 * Keys group together mongoose models.
 * Every other model must be identified by a key and belongs to a key.
 */
const name = 'review';
const schema = new mongoose.Schema(
  {
    post: { type: mongoose.Types.ObjectId, ref: 'post' },
    author: { type: mongoose.Types.ObjectId, ref: 'identity' },
    to: {
      type: mongoose.Types.ObjectId,
      ref: 'identity',
    },
    comment: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model(name, schema);
