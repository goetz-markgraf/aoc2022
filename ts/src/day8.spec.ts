import { calcSenicScore, day81, day82, toField } from "./day8";
import { readText } from "./util";

const testInput = [
    "30373",
    "25512",
    "65332",
    "33549",
    "35390"
]

describe.skip('part 1', () => {
    it("should return 21", () => {
        const result = day81(testInput)
        expect(result).toEqual(21)
    });
    it("should do the real thing", () => {
        const input = readText("day8.input")
        const result = day81(input)
        expect(result).toEqual(1829)
    });
});

describe.skip('part 2', () => {
    it("should calculate tests", () => {
        const field = toField(testInput)
        expect(calcSenicScore(field, 2, 1)).toEqual(4)
        expect(calcSenicScore(field, 2, 3)).toEqual(8)
    });
    it("should return 8", () => {
        const result = day82(testInput)
        expect(result).toEqual(8)
    });
    it("should do the real thing", () => {
        const input = readText("day8.input")
        const result = day82(input)
        expect(result).toEqual(291840)
    });
});
