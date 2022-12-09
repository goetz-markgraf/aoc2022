import { day21, day22 } from "./day2";
import { readLines } from "./util";

const testInput = [
    "A Y",
    "B X",
    "C Z"
]

// A Rock
// B Paper
// C Scissors
// X Rock   1   lose
// Y Paper  2   draw
// Z Scissors   3   win

describe.skip('day 2 1', () => {
    it("should be 15 for testInput", () => {
        const result = day21(testInput)
        expect(result).toEqual(15)
    });

    it("should create the real result", () => {
        const input = readLines("day2.input")
        const result = day21(input)
        expect(result).toEqual(13682)
    });
});

describe.skip('day 2 2', () => {
    it("should be 15 for testInput", () => {
        const result = day22(testInput)
        expect(result).toEqual(12)
    });

    it("should create the real result", () => {
        const input = readLines("day2.input")
        const result = day22(input)
        expect(result).toEqual(12881)
    });
});
