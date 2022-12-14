import { convertToLines, day14_1, day14_2, findLowestPoint, hitsLine, hitsSand, makeStore } from "./day14";
import { readLines } from "./util";

const testInput = [
    "498,4 -> 498,6 -> 496,6",
    "503,4 -> 502,4 -> 502,9 -> 494,9"
]

describe('test functions', () => {
    const lines = testInput.flatMap(convertToLines)
    const store = makeStore(lines)

    it("should have a store with 5 lines", () => {
        expect(store.horizontal.length).toEqual(3)
        expect(store.vertical.length).toEqual(2)
    });
    it("should find the lowest point", () => {
        expect(findLowestPoint(store)).toEqual(9)
    });
    it("should find line hits", () => {
        expect(hitsLine({ x: 500, y: 9 }, store)).toBeTruthy()
        expect(hitsLine({ x: 500, y: 8 }, store)).toBeFalsy()
        expect(hitsLine({ x: 498, y: 5 }, store)).toBeTruthy()
    });
    it("should find sand hits", () => {
        const sandStore = [
            { x: 1, y: 1 },
            { x: 2, y: 2 }
        ]
        expect(hitsSand({ x: 1, y: 1 }, sandStore)).toBeTruthy()
        expect(hitsSand({ x: 2, y: 2 }, sandStore)).toBeTruthy()
        expect(hitsSand({ x: 2, y: 1 }, sandStore)).toBeFalsy()
    });
});

describe('part 1', () => {
    it("should return 24", () => {
        const result = day14_1(testInput)
        expect(result).toEqual(24)
    });
    it("should do the real thing", () => {
        const input = readLines("day14.input")
        const result = day14_1(input)
        expect(result).toEqual(672)
    });
});

describe('part 2', () => {
    it("should return 93", () => {
        const result = day14_2(testInput)
        expect(result).toEqual(93)
    });
    it("should do the real thing", () => {
        const input = readLines("day14.input")
        const result = day14_2(input)
        expect(result).toEqual(0)
    });
});
