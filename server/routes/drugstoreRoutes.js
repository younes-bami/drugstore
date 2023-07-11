// routes/drugstoreRoutes.js
// routes/drugstoreRoutes.js
const express = require('express');
const router = express.Router();
const drugstoreController = require('../controllers/drugstoreController');
const { validateDrugstore } = require('../middleware/drugstoreValidator');


/**
 * @swagger
 * /api/drugstores:
 *   get:
 *     summary: Retrieve a list of drugstores
 *     responses:
 *       200:
 *         description: A list of drugstores.
 */
console.log("router");
router.get('/drugstores' , drugstoreController.getDrugstores);

module.exports = router;
