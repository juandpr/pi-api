const rewire = require('rewire');
const getPiDecimalsModule = rewire('./getPiDecimals');

describe('getPiDecimals File', () => {
    const testCases = [
        {
            id: 1,
            start: 0,
            length: 10,
            result: [1]
        }
    ];
    describe.each(testCases)('getFilesToOpen method', ({id, start, length, result}) => {
        

        it(`${id}: with start = ${start} and length = ${length}`, () => {
            const getFilesToOpen = getPiDecimalsModule.__get__('getFilesToOpen');

            const realResult = getFilesToOpen(start, length);
            expect(realResult).toEqual(result);
        })
    });
});