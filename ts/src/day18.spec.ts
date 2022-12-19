import { countTrue, day18_1, day18_1_alt, lineToCube, matchSides, samePos, sameSide } from "./day18";
import { readLines } from "./util";

const testInput = [
    "2,2,2",
    "1,2,2",
    "3,2,2",
    "2,1,2",
    "2,3,2",
    "2,2,1",
    "2,2,3",
    "2,2,4",
    "2,2,6",
    "1,2,5",
    "3,2,5",
    "2,1,5",
    "2,3,5"
]

const testInput2 = [
    "0,0,0",
    "1,0,0",
    "2,0,0",
    "2,1,0",
    "2,2,0",
    "1,2,0",
    "0,2,0",
    "0,1,0",
    "1,1,1",
    "1,1,-1",
    "1,0,1",
    "1,0,-1"
]

describe('details', () => {
    it("should create a nice cube", () => {
        expect(lineToCube("1, 2, 3")).toEqual({
            pos: { x: 1, y: 2, z: 3 },
            sides: [ true, true, true, true, true, true ]
        })
    });
    it("should compare position", () => {
        const q1 = lineToCube("1, 2, 3")
        expect(samePos(q1.pos, { x: 1, y: 1, z: 1 })).toBeFalsy()
        expect(samePos(q1.pos, { x: 1, y: 2, z: 3 })).toBeTruthy()
    });
    it("should count true", () => {
        expect(countTrue([ true, false, true ])).toEqual(2)
        expect(countTrue([ false, false, false ])).toEqual(0)
        expect(countTrue([ false, true, true, true ])).toEqual(3)
    });
    it("should find matching sides", () => {
        const q1 = lineToCube("0,0,0")
        const q2 = lineToCube("0,0,1")
        const ss = sameSide(q1)(q2)
        expect(ss).toBeTruthy()
        matchSides(q1, ss![0], ss![1])
        expect(countTrue(q1.sides)).toEqual(5)
        expect(countTrue(q2.sides)).toEqual(5)
    });
    it("should find matching sides", () => {
        const q1 = lineToCube("0,0,0")
        const q2 = lineToCube("0,0,1")
        const ss = sameSide(q1)(q2)
        expect(ss).toBeTruthy()
        expect(ss?.length).toEqual(2)
    });
});

describe('part 1', () => {
    it("should return 64", () => {
        const result = day18_1(testInput)
        expect(result).toEqual(64)
    });
    it("should return 48", () => {
        const result = day18_1(testInput2)
        expect(result).toEqual(48)
    });
    it("should do the real thing", () => {
        const input = readLines("day18.input")
        const result = day18_1(input)
        expect(result).toEqual(0)
    });
});

describe('part 1 alt', () => {
    it("should return 64", () => {
        const result = day18_1_alt(testInput)
        expect(result).toEqual(64)
    });
    it("should return 48", () => {
        const result = day18_1_alt(testInput2)
        expect(result).toEqual(48)
    });
    it("should do the real thing", () => {
        const input = readLines("day18.input")
        const result = day18_1_alt(input)
        expect(result).toEqual(0)
    });
});
