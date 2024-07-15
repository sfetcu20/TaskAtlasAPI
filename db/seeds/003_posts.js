/* eslint-disable no-console */
const Post = require('../../models/post');
const posts = require('../resources/posts');

exports.seed = async () => {
  try {
    console.log('Planting seeds for Posts');

    const seeds = await posts();
    await Post.insertMany(seeds);

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot insert Posts');
    console.error(err);
  }
};
