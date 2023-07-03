// middleware/drugstoreValidator.js
const { body, validationResult } = require('express-validator');

exports.validateDrugstore = [
  body('name').notEmpty().withMessage('Name is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('coordinates').isObject().withMessage('Coordinates must be an object'),
  body('openSlots').isArray().withMessage('Open slots must be an array'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
