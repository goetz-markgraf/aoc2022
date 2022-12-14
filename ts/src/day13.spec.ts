import { compare, day13_1, day13_2 } from "./day13";
import { readText } from "./util";

const testInput =
    "[1,1,3,1,1]\n" +
    "[1,1,5,1,1]\n" +
    "\n" +
    "[[1],[2,3,4]]\n" +
    "[[1],4]\n" +
    "\n" +
    "[9]\n" +
    "[[8,7,6]]\n" +
    "\n" +
    "[[4,4],4,4]\n" +
    "[[4,4],4,4,4]\n" +
    "\n" +
    "[7,7,7,7]\n" +
    "[7,7,7]\n" +
    "\n" +
    "[]\n" +
    "[3]\n" +
    "\n" +
    "[[[]]]\n" +
    "[[]]\n" +
    "\n" +
    "[1,[2,[3,[4,[5,6,7]]]],8,9]\n" +
    "[1,[2,[3,[4,[5,6,0]]]],8,9]\n"

describe('compare tests', () => {
    it("should do simple compares", () => {
        expect(compare(1, 2)).toBeTruthy()
        expect(compare(2, 1)).toBeFalsy()
        expect(compare(1, 1)).toBeUndefined()
    });
    it("should do simple array compares", () => {
        expect(compare([ 1, 1 ], [ 1, 2 ])).toBeTruthy()
        expect(compare([ 2, 1 ], [ 1, 2 ])).toBeFalsy()
        expect(compare([ 1, 1 ], [ 1, 1 ])).toBeUndefined()
        expect(compare([ 1, 1 ], [ 1, 1, 1 ])).toBeTruthy()
        expect(compare([ 1, 1, 1 ], [ 1, 1 ])).toBeFalsy()
    });
    it("should compare mixed stuff", () => {
        expect(compare(1, [ 1 ])).toBeUndefined()
        expect(compare(1, [ 2 ])).toBeTruthy()
        expect(compare([ 1, 1 ], 2)).toBeTruthy()
        expect(compare([ 1, 1 ], 1)).toBeFalsy()
    });
});

describe('part 1', () => {
    it("should return 13", () => {
        const result = day13_1(testInput)
        expect(result).toEqual(13)
    });
    it("should do the real thing", () => {
        const input = readText("day13.input")
        const result = day13_1(input)
        expect(result).toEqual(6568)
    });
});

describe('part 2', () => {
    it("should return 140", () => {
        const result = day13_2(testInput)
        expect(result).toEqual(140)
    });
    it("should do the real thing", () => {
        const input = readText("day13.input")
        const result = day13_2(input)
        expect(result).toEqual(19493)
    });
});
