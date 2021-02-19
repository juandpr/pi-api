const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const piController = require('../src/pi');
const { MAX_NUMBER_OF_DECIMALS, MAX_LENGTH } = require('../src/pi/constants');

/* GET pi decimals */
router.get('/', (req, res, next) => {
    const start = parseInt(req.query.start) || 0;
    const length = parseInt(req.query.length) || 8;

    if ((start + length) > MAX_NUMBER_OF_DECIMALS) {
        return next(createError(400, `We only have: ${MAX_NUMBER_OF_DECIMALS} in our records. Please try again with lower numbers.`));
    }

    if (length > MAX_LENGTH) {
        return next(createError(400, `You can request a maximum of: ${MAX_LENGTH} decimals.`));
    }

    piController.getPiDecimals(start, length)
    .then((decimals) => {
        res.json(
            {
                decimals,
                start,
                length
            }
        );
    })
    .catch((err) => {
        return next(createError(500, err.message));
    });
});

module.exports = router;
