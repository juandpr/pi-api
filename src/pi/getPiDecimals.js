const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

/**
 * Starting from "number", returns "length" amount of decimals of the digit Pi.
 * @param {number} start
 * @param {number} length
 *
 * @returns {Promise} a promise that resolves with the decimals.
 */
const getPiDecimals = (start, length) => {
    /* First we determine which files to open */
    /**
     * Each file has 10.000.000 (ten million) decimals
     * If the start is < 10.000.000 then we need to open the first file
     * If the start is > 10.000.000 then we need to open the int value of ((start / 10.000.000) + 1) file
     * use Math.floor() up here
     * Example, if the start is 37.500.000 then, we open the 4th file
     * Then we store this value 7.500.000 (37.500.000 mod 10.000.000) as "rest"
     * Now we need to determine if we need to open more than one file
     * If the length of rest + length is greater than 10.000.000 then we open the second file
     * Example
     * length = 3.000.000
     * rest + 3.000.000 = 10.500.000 then we open the second file
     */

    /* Then we open them and iterate through the decimals */
    /**
     * At this point we will have an array with the numbers of the files we need to open
     * First we open the first file in the array.
     * If there's a second file in the array, we read it from "rest" till the end and we store (length - (fileLenght - rest)) as remaining
     * If there's not a second file in the array, we read it from "rest" until rest+length
     * If there's a second file in the array, we open the second file in the array
     * Then we read from 0 to remaining
     * Example
     * length = 3.000.000
     * there's a second file in the array
     * we open the first one and read it from 7.500.000 to 10.000.000
     * we store 3.000.000 - (10.000.000 - 7.500.000) = 500.000 as remaining
     * we open the second file and read it form 0 to 500.000
     */

    /* Then we return the decimals */
    const fileName = path.join(__dirname, '../../public/pi/pi1');

    return fsPromises.readFile(fileName, {
        encoding: 'utf8'
    }).then((data) => {
        return data.substring(0, 2764800);
    });
};

module.exports = getPiDecimals;
