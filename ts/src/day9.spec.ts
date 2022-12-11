import { uniq } from "remeda";
import { day91, day92, moveTail, toPosItem } from "./day9";
import { readLines } from "./util";

const testInput = [
    "R 4",
    "U 4",
    "L 3",
    "D 1",
    "R 4",
    "D 1",
    "L 5",
    "R 2"
]
const testInput2 = [
    "R 5",
    "U 8",
    "L 8",
    "D 3",
    "R 17",
    "D 10",
    "L 25",
    "U 20"
]

describe.skip('part 1', () => {
    it("should make Pos uniq", () => {
        const input = [
            toPosItem({ x: 1, y: 1 }),
            toPosItem({ x: 0, y: 0 }),
            toPosItem({ x: 1, y: 1 })
        ]
        expect(uniq(input)).toHaveLength(2)
    });
    describe.skip("should move tail correctly", () => {
        it("should not move", () => {
            const result = moveTail({ x: -1, y: 1 }, { x: 0, y: 0 })
            expect(result.x).toEqual(0)
            expect(result.y).toEqual(0)
        });
        it("should move in straight line", () => {
            const result = moveTail({ x: 0, y: -2 }, { x: 0, y: 0 })
            expect(result.x).toEqual(0)
            expect(result.y).toEqual(-1)
        });
        it("should move diagonally", () => {
            const result = moveTail({ x: 1, y: -2 }, { x: 0, y: 0 })
            expect(result.x).toEqual(1)
            expect(result.y).toEqual(-1)
        });
    });
    it("should return 13", () => {
        const result = day91(testInput)
        expect(result).toEqual(13)
    });
    it("should do the real thing", () => {
        const input = readLines("day9.input")
        const result = day91(input)
        expect(result).toEqual(6190)
    });
});

describe.skip("part2", () => {
    it("should return 1", () => {
        const result = day92(testInput)
        expect(result).toEqual(1)
    });
    it("should return 36", () => {
        const result = day92(testInput2)
        expect(result).toEqual(36)
    });
    it("should do the real thing", () => {
        const input = readLines("day9.input")
        const result = day92(input)
        expect(result).toEqual(2516)
    });
})
