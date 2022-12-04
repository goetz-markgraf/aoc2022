import { day41, day42 } from "./day4";
import { readText } from "./util";

const testInput = [
    "2-4,6-8",
    "2-3,4-5",
    "5-7,7-9",
    "2-8,3-7",
    "6-6,4-6",
    "2-6,4-8"
]

describe('day 4 1', () => {
    it("should return 2", () => {
        const result = day41(testInput)
        expect(result).toEqual(2)
    });

    it("should do the real thing", () => {
        const input = readText("day4.input")
        const result = day41(input)
        expect(result).toEqual(494)
    });
});

describe('day 4 2', () => {
    it("should return 4", () => {
        const result = day42(testInput)
        expect(result).toEqual(4)
    });

    it("should do the real thing", () => {
        const input = readText("day4.input")
        const result = day42(input)
        expect(result).toEqual(833)
    });
});
