const drugstoreService = require('../services/drugstoreService');
const logger = require('../config/logger');

const getDrugstores = async (req, res) => {
  const userLatitude = parseFloat(req.query.lat);
  const userLongitude = parseFloat(req.query.lng);

  logger.info(`User location received: Latitude: ${userLatitude}, Longitude: ${userLongitude}`); // Log with Winston
  
  try {
    const drugstores = await drugstoreService.getDrugstores(userLatitude, userLongitude); // Pass userLatitude and userLongitude
    logger.info(`Fetched ${drugstores.length} drugstores`); // Log with Winston
    res.json(drugstores);
  } catch (err) {
    logger.error(`Error fetching drugstores: ${err}`); // Log error with Winston
    res.status(500).json({ message: 'An error occurred while fetching drugstores' });
  }
};

// ... rest of the code


const addDrugstore = async (req, res) => {
  try {
    // Your logic for adding a drugstore goes here
    // Example: const newDrugstore = await drugstoreService.addDrugstore(req.body);
    // res.json(newDrugstore);
  } catch (err) {
    logger.error(`Error adding drugstore: ${err}`);
    res.status(500).json({ message: 'An error occurred while adding the drugstore' });
  }
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
  addDrugstore,
};
