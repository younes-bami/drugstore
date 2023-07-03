// controllers/drugstoreController.js
const drugstoreService = require('../services/drugstoreService');
const logger = require('../config/logger');

const getDrugstores = async (req, res) => {
  try {
    const drugstores = await drugstoreService.getDrugstores();
    logger.info(`Fetched ${drugstores.length} drugstores`); // Log with Winston
    res.json(drugstores);
  } catch (err) {
    logger.error(`Error fetching drugstores: ${err}`); // Log error with Winston
    res.status(500).json({ message: 'An error occurred while fetching drugstores' });
  }
};

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
  

module.exports = {
    getDrugstores,
    //addDrugstore, // Make sure to export it

};
