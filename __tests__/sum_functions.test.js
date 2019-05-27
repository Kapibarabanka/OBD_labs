const sum_functions = require('../js/sum_functions');

describe('Simple sum tests', () => {
    it('should return 3 for arguments 1 and 2', () => {
        expect(sum_functions.simple_sum(1, 2)).toBe(3);
    })
})

describe('Sum with dependence tests', () => {
    it('should return 4 for arguments 1 and 2', () => {
        expect(sum_functions.depending_sum(1, 2)).toBe(4);
    })
})

describe('Async sum tests', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should return 4 for arguments 1 and 2', () => {
        initial = jest.fn((cb) => 1);
        const result = sum_functions.async_sum(1, 2);

        result.then((result) => {
            expect(result).not.toEqual({
                value: 3,
                param1: 1,
                param2: 2,
            });

            //TODO: resolve 'mock function was not called' issue
            expect(initial).toHaveBeenCalledWith(1);
        })

        jest.runTimersToTime(100);

        return result;
    })
})
