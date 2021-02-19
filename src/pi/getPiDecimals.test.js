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

    const testCasesGetPiDecimals = [
        {
            start: 0,
            length: 5,
            result: '12345'
        },
        {
            start: 0,
            length: 10,
            result: '1234567890'
        },
        {
            start: 5,
            length: 2,
            result: '67'
        },
        {
            start: 5,
            length: 5,
            result: '67890'
        },
        {
            start: 8,
            length: 4,
            result: '9012'
        },
        {
            start: 5,
            length: 12,
            result: '678901234567'
        },
        {
            start: 11,
            length: 8,
            result: '23456789'
        },
        {
            start: 4,
            length: 20,
            result: '56789012345678901234'
        },
        {
            start: 0,
            length: 30,
            result: '123456789012345678901234567890'
        }
    ];

    describe.each(testCasesFilesToOpen)('getFilesToOpen method', ({start, length, result}) => {
        it(`With start = ${start} and length = ${length}`, () => {
            const getFilesToOpen = getPiDecimalsModule.__get__('getFilesToOpen');

            const realResult = getFilesToOpen(start, length);
            expect(realResult).toEqual(result);
        });
    });

    describe.each(testCasesGetPiDecimals)('getPiDecimals method', ({id, start, length, result}) => {
        it(`With start = ${start} and length = ${length}`, () => {
            const getPiDecimals = getPiDecimalsModule.__get__('getPiDecimals');
            getPiDecimalsModule.__set__('DECIMALS_PER_FILE', 10);
            getPiDecimalsModule.__set__('FILE_PREFIX', '../../public/mocks/pi');

            return getPiDecimals(start, length).then((decimals) => {
                expect(decimals).toEqual(result);
            });
        });
    });
});
