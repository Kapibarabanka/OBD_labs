const sum_functions = require('../js/sum_functions');
const depends = require('../js/depends_for_sum');
const depends_initial_holder = depends.initial;

afterEach(() => {
    depends.initial = depends_initial_holder
})

describe('Simple sum tests', () => {
    it('should return 3 for arguments 1 and 2', () => {
        expect(sum_functions.simple_sum(1, 2)).toBe(3);
    })
})

describe('Sum with dependence tests', () => {
    it('should return 4 for arguments 1 and 2 (incorrect test without mocking "initial" function)', () => {
        expect(sum_functions.depending_sum(1, 2)).toBe(4);
    })
    it('should return 4 for arguments 1 and 2 (test with mocking "initial" function)', () => {
        depends.initial = jest.fn(() => 1)
        expect(sum_functions.depending_sum(1, 2)).toBe(4);
    })
    it('should return 5 for arguments 1 and 2 (test with mocking "initial" with changed return value from 1 to 2)', () => {
        depends.initial = jest.fn(() => 2)
        expect(sum_functions.depending_sum(1, 2)).toBe(5);
    })
})

describe('Async sum tests', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should return 4 for arguments 1 and 2 and call mock function once', () => {
        depends.initial = jest.fn(() => 1);
        const result = sum_functions.async_sum(1, 2);

        result.then((result) => {
            expect(result).not.toEqual({
                value: 3,
                param1: 1,
                param2: 2,
            });
            expect(depends.initial).toHaveBeenCalledWith();
        })

        jest.runTimersToTime(100);

        return result;
    })
})
