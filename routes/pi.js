const express = require('express');
const router = express.Router();
const piController = require('../src/pi');

/* GET pi decimals */
router.get('/', (req, res, next) => {
  piController.getPiDecimals(5, 12)
  .then((decimals) => {
    res.json({decimals});
  })
  .catch((err) => {
    throw new Error(err);
  });
});

module.exports = router;
