const connectToMongo = require('../functions/connect');

const clients = require('./seeds/002_clients');
const posts = require('./seeds/003_posts');
const seed = async (params) => {
  if (!process.env.MONGODB_URI) {
    throw new Error('You must set your environment variables before running this script');
  }
  if (process.env.MONGODB_URI.includes('mongodb+srv') && params !== '--force') {
    throw new Error("You can't run this seed on a live database");
  }

  await connectToMongo();

  await clients.seed();
  await posts.seed();
};

(async () => {
  try {
    const params = process.argv;
    await seed(params[2]); // invoke function
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports.seed = seed;
