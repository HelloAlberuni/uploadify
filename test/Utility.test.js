import { Utility } from '../src/Utility';

describe('arrayIntersect', () => {
    test('returns an array of common elements between two arrays', () => {
        const array1 = ['apple', 'banana', 'orange'];
        const array2 = ['banana', 'kiwi', 'grape'];

        expect(Utility.arrayIntersect(array1, array2)).toEqual(['banana']);
    });

    test('returns an array of common elements between two arrays - Number', () => {
        const array1 = [1, 4, 6];
        const array2 = [3, 6, 4, 8, 9];

        expect(Utility.arrayIntersect(array1, array2)).toEqual([6, 4]);
    });

    test('returns an empty array if no common elements between two arrays', () => {
        const array1 = ['apple', 'banan', 'orange'];
        const array2 = ['banana', 'kiwi', 'grape'];

        expect(Utility.arrayIntersect(array1, array2)).toEqual([]);
    });

    test('returns an empty array if both are empty array', () => {
        const array1 = [];
        const array2 = [];

        expect(Utility.arrayIntersect(array1, array2)).toEqual([]);
    });

    test('returns an empty array if both are empty array', () => {
        const array1 = [];
        const array2 = [];

        expect(Utility.arrayIntersect(array1, array2)).toEqual([]);
    });

    test('returns an empty array of when objects are passed as parameters', () => {
        const array1 = [1, 2, 3, 4, 5];
        const array2 = { 3: 'three', 4: 'four', 5: 'five' }; // Object instead of array

        const result = Utility.arrayIntersect(array1, array2);

        expect(result).toEqual([]);
    });
});
