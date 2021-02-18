const express = require('express');
const router = express.Router();
const piController = require('../src/pi');

/* GET pi decimals */
router.get('/', (req, res, next) => {
  res.json({decimals: piController.getPiDecimals(1, 2)});
});

module.exports = router;
