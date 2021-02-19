const rewire = require('rewire');
const getPiDecimalsModule = rewire('./getPiDecimals');

describe('getPiDecimals File', () => {
    const testCasesFilesToOpen = [
        {
            start: 0,
            length: 10,
            result: [1]
        },
        {
            start: 0,
            length: 7500000,
            result: [1]
        },
        {
            start: 0,
            length: 10000000,
            result: [1]
        },
        {
            start: 0,
            length: 15000000,
            result: [1, 2]
        },
        {
            start: 5000000,
            length: 2500000,
            result: [1]
        },
        {
            start: 5000000,
            length: 5000000,
            result: [1]
        },
        {
            start: 17500000,
            length: 1000000,
            result: [2]
        },
        {
            start: 17500000,
            length: 5000000,
            result: [2, 3]
        },
        {
            start: 17500000,
            length: 15000000,
            result: [2, 3, 4]
        }
    ];

    describe.each(testCasesFilesToOpen)('getFilesToOpen method', ({id, start, length, result}) => {
        it(`With start = ${start} and length = ${length}`, () => {
            const getFilesToOpen = getPiDecimalsModule.__get__('getFilesToOpen');

            const realResult = getFilesToOpen(start, length);
            expect(realResult).toEqual(result);
        })
    });
});
