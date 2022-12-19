import { day31, day32 } from "./day3";
import { readLines } from "./util";

const testInput = [
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw"
]

describe('day 3 1', () => {
    it("should return 157", () => {
        const result = day31(testInput)
        expect(result).toEqual(157)
    });

    it("should do the real thing", () => {
        const input = readLines("day3.input")
        const result = day31(input)
        expect(result).toEqual(8018)
    });
});

describe('day 3 2', () => {
    it("should return 70", () => {
        const result = day32(testInput)
        expect(result).toEqual(70)
    });

    it("should do the real thing", () => {
        const input = readLines("day3.input")
        const result = day32(input)
        expect(result).toEqual(2518)
    });
});
