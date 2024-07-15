/* eslint-disable no-console */
const Client = require('../../models/client');
const clients = require('../resources/clients');

exports.seed = async () => {
  try {
    console.log('Planting seeds for clients');

    const seeds = await clients();
    await Client.insertMany(seeds);

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot insert clients');
    console.error(err);
  }
};
