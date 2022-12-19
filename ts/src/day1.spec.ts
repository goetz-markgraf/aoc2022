import { day11, day12 } from "./day1";
import { readLines } from "./util";

const testInput = [
    "1000",
    "2000",
    "3000",
    "",
    "4000",
    "",
    "5000",
    "6000",
    "",
    "7000",
    "8000",
    "9000",
    "",
    "10000"
]

describe('day 1 1', () => {
    it("should return 24000 for test input", () => {
        const result = day11(testInput)
        expect(result).toEqual(24000)
    });

    it("should run the real task", () => {
        const lines = readLines("day1.input")
        const result = day11(lines)
        expect(result).toEqual(70369)
    });
});

describe('day 1 2', () => {
    it("should return 45000 for test input", () => {
        const result = day12(testInput)
        expect(result).toEqual(45000)
    });

    it("should run the real task", () => {
        const lines = readLines("day1.input")
        const result = day12(lines)
        expect(result).toEqual(203002)
    });
});
