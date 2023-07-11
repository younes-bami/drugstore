const Drugstore = require('../models/Drugstore');
const redis = require('../config/redis');

const getDrugstores = async (userLatitude, userLongitude, radius) => {
  let drugstores;
  try {
    // Try fetching the data from Redis first
    const cachedData = await redis.get('drugstores');
    if (cachedData) {
      console.log('Serving from cache');
      drugstores = JSON.parse(cachedData);
    } else {
      console.log('Fetching from database');
      drugstores = await Drugstore.find();

      // Cache the data in Redis for 1 hour
      redis.set('drugstores', JSON.stringify(drugstores), 'EX', 3600);
    }
  } catch (err) {
    console.error(`Redis Error: ${err.message}`);
  }

  // Filter drugstores within the specified radius
  const nearbyDrugstores = drugstores.filter(drugstore => {

    const distance = haversineDistance(
      userLatitude,
      userLongitude,
      drugstore.coordinates.latitude,
      drugstore.coordinates.longitude
    );
    console.log ("radius :" + radius);
    return distance <= radius; // Filter by the specified radius
  });

  console.log(`Filtered ${nearbyDrugstores.length} drugstores within ${radius} km`); // Log filtered drugstores

  return nearbyDrugstores;
};

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = {
  getDrugstores,
};
