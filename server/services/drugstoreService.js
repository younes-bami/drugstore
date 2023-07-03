// services/drugstoreService.js
const Drugstore = require('../models/Drugstore');
const redis = require('../redis');

const getDrugstores = async () => {
  try {
    // Try fetching the data from Redis first
    const cachedData = await redis.get('drugstores');
    if (cachedData) {
      console.log('Serving from cache');
      return JSON.parse(cachedData);
    }
  } catch (err) {
    console.error(`Redis Error: ${err.message}`);
  }

  // If not in cache, fetch from database
  console.log('Fetching from database');
  const drugstores = await Drugstore.find();

  try {
    // Cache the data in Redis for 1 hour
    redis.set('drugstores', JSON.stringify(drugstores), 'EX', 3600);
  } catch (err) {
    console.error(`Redis Error: ${err.message}`);
  }

  return drugstores;
};

const invalidateCache = async (key) => {
  try {
    // Delete the cache key
    await redis.del(key);
  } catch (err) {
    console.error(`Redis Error: ${err.message}`);
  }
};

module.exports = {
  getDrugstores,
  invalidateCache,
};
