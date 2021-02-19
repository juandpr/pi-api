const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const { DECIMALS_PER_FILE, FILE_PREFIX } = require('./constants');

/**
 * Gets the files that we need to open in order to retrieve the decimals from start to length
 * @param {number} start
 * @param {number} length
 *
 * @returns {Array} an array with the numbers of the files to open
 */
const getFilesToOpen = (start, length) => {
    const firstFile = Math.floor((start / DECIMALS_PER_FILE)) + 1;
    const rest = start % DECIMALS_PER_FILE;
    let files = [];

    let used = (start + length <= DECIMALS_PER_FILE)
        ? length
        : DECIMALS_PER_FILE - rest;

    let currentFile = firstFile;

    files.push(currentFile);

    while(used < length) {
        used += (length - used) > DECIMALS_PER_FILE
            ? DECIMALS_PER_FILE
            : (length - used);

        currentFile++
        files.push(currentFile);
    }

    return files;
};

/**
 * Starting from "number", returns "length" amount of decimals of the digit Pi.
 * @param {number} start
 * @param {number} length
 *
 * @returns {Promise} a promise that resolves with the decimals.
 */
const getPiDecimals = (start, length) => {
    const filesToOpen = getFilesToOpen(start, length)
        .map((fileNumber) => {
            return path.join(__dirname, `${FILE_PREFIX}${fileNumber}`);
        })
        .map((fileName) => {
            return fsPromises.readFile(fileName, {
                encoding: 'utf8'
            });
        });

    return Promise.all(filesToOpen).then((values) => {
        return values.join('');
    }).then((allDecimals) => {
        const startAtFirstFile = start % DECIMALS_PER_FILE;

        return allDecimals.substr(startAtFirstFile, length);
    }); 
};

module.exports = getPiDecimals;
