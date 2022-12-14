import { createMatrix, day12_1, findField, findPaths, fits, heightValue, isInPath, Path } from "./day12";
import { readLines } from "./util";

const testInput = [
    "Sabqponm",
    "abcryxxl",
    "accszExk",
    "acctuvwj",
    "abdefghi"
]

const simpleInput = [
    "SbcdefghijklmnopqrstuvwxyE"
]

describe('helper tests', () => {
    const matrix = createMatrix(testInput)

    it("should create a number matrix", () => {
        expect(matrix.length).toEqual(5)
        expect(matrix[0].length).toEqual(8)
    });
    it("should find S", () => {
        const sPos = findField(matrix, "S")
        const ePos = findField(matrix, "E")
        expect(sPos).toEqual({ x: 0, y: 0 })
        expect(ePos).toEqual({ x: 5, y: 2 })
    });
    it("should give correct value", () => {
        expect(heightValue(matrix, { x: 1, y: 1 })).toEqual("b")
        expect(heightValue(matrix, { x: 0, y: 0 })).toEqual("a")
        expect(heightValue(matrix, { x: 5, y: 2 })).toEqual("z")
    });
    it("should find a valid path in the middle", () => {
        const path: Path = [ { x: 1, y: 0 }, { x: 2, y: 0 } ]
        const newPaths = findPaths(matrix, path) //?
        expect(newPaths.length).toEqual(1)
        expect(newPaths[0][2]).toEqual({ x: 2, y: 1 })
    });
    it("should find a valid path on the edge", () => {
        const path: Path = [ { x: 1, y: 2 }, { x: 2, y: 2 } ]
        const newPaths = findPaths(matrix, path) //?
        expect(newPaths.length).toEqual(2)
        expect(newPaths[0][2]).toEqual({ x: 2, y: 1 })
        expect(newPaths[1][2]).toEqual({ x: 2, y: 3 })
    });
    it("should test basic things", () => {
        expect(isInPath([ { x: 1, y: 2 }, { x: 2, y: 2 } ], { x: 1, y: 2 })).toBeTruthy()
    })
    it("should test vars", () => {
        expect(fits("a", "b")).toBeTruthy()
        expect(fits("a", "c")).toBeFalsy()
    });
    it("should test unshift and push", () => {
        const start = [ 1, 2, 3 ]
        const first = start.shift() //?
        start.push(4)
        expect(first).toEqual(1)
        expect(start).toEqual([ 2, 3, 4 ])
    });
});

describe('part 1', () => {
    it("should return 31", () => {
        const result = day12_1(testInput)
        expect(result).toEqual(31)
    });
    it("should take the easy way", () => {
        const result = day12_1(simpleInput)
        expect(result).toEqual(25)
    });
    it("should do the real thing", () => {
        const input = readLines("day12.input")
        const result = day12_1(input)
        expect(result).toEqual(0)
    });
});
