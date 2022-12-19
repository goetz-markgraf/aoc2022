import { day51, day52 } from "./day5";
import { readLines } from "./util";

const testInput = [
    "    [D]",
    "[N] [C]",
    "[Z] [M] [P]",
    " 1   2   3",
    "",
    "move 1 from 2 to 1",
    "move 3 from 1 to 3",
    "move 2 from 2 to 1",
    "move 1 from 1 to 2"
]

describe('part 1', () => {
    it("should return CMZ", () => {
        const result = day51(testInput)
        expect(result).toEqual("CMZ")
    });
    it("should do the real thing", () => {
        const input = readLines("day5.input")
        const result = day51(input)
        expect(result).toEqual("LBLVVTVLP")
    });
});

describe('part 2', () => {
    it("should return CMZ", () => {
        const result = day52(testInput)
        expect(result).toEqual("MCD")
    });
    it("should do the real thing", () => {
        const input = readLines("day5.input")
        const result = day52(input)
        expect(result).toEqual("TPFFBDRJD")
    });
});
