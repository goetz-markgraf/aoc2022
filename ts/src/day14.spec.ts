import {
    convertToLines,
    createMatrix,
    day14_1,
    day14_2,
    fillStoreInMatrix,
    findBorders,
    hitsAny,
    letFall,
    makeStore
} from "./day14";
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
        expect(findBorders(store)).toEqual([ 9, 494, 503 ])
    });
    it("should create a matrix", () => {
        const borders = findBorders(store)
        const matrix = createMatrix(borders)
        expect(matrix.length).toEqual(11)
        expect(matrix[0].length).toEqual(512)
        expect(matrix[1][1]).toEqual(0)
    });
    it("should find line hits", () => {
        const borders = findBorders(store)
        const matrix = createMatrix(borders)
        fillStoreInMatrix(matrix, store)
        expect(hitsAny({ x: 500, y: 9 }, matrix, 1000)).toBeTruthy()
        expect(hitsAny({ x: 500, y: 8 }, matrix, 1000)).toBeFalsy()
        expect(hitsAny({ x: 498, y: 5 }, matrix, 1000)).toBeTruthy()
    });
    it("should find sand hits", () => {
        const borders = findBorders(store)
        const matrix = createMatrix(borders)
        fillStoreInMatrix(matrix, store)
        matrix[1][1] = 2
        matrix[2][2] = 2

        expect(hitsAny({ x: 1, y: 1 }, matrix, 1000)).toBeTruthy()
        expect(hitsAny({ x: 2, y: 2 }, matrix, 1000)).toBeTruthy()
        expect(hitsAny({ x: 2, y: 1 }, matrix, 1000)).toBeFalsy()
    });
    it("should detect abyss", () => {
        const borders = findBorders(store)
        const matrix = createMatrix(borders)

        const sand = letFall(matrix, 9)
        expect(sand.x).toEqual(500)
        expect(sand.y).toEqual(10)
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
        expect(result).toEqual(26831)
    });
});
