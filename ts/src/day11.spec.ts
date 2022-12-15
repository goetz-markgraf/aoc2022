import { day11_1, day11_2, divideByAndRoundDown } from "./day11";
import { readText } from "./util";

const testInput =
    "Monkey 0:\n" +
    "  Starting items: 79, 98\n" +
    "  Operation: new = old * 19\n" +
    "  Test: divisible by 23\n" +
    "    If true: throw to monkey 2\n" +
    "    If false: throw to monkey 3\n" +
    "\n" +
    "Monkey 1:\n" +
    "  Starting items: 54, 65, 75, 74\n" +
    "  Operation: new = old + 6\n" +
    "  Test: divisible by 19\n" +
    "    If true: throw to monkey 2\n" +
    "    If false: throw to monkey 0\n" +
    "\n" +
    "Monkey 2:\n" +
    "  Starting items: 79, 60, 97\n" +
    "  Operation: new = old * old\n" +
    "  Test: divisible by 13\n" +
    "    If true: throw to monkey 1\n" +
    "    If false: throw to monkey 3\n" +
    "\n" +
    "Monkey 3:\n" +
    "  Starting items: 74\n" +
    "  Operation: new = old + 3\n" +
    "  Test: divisible by 17\n" +
    "    If true: throw to monkey 0\n" +
    "    If false: throw to monkey 1\n"

it("should divide and round", () => {
    expect(divideByAndRoundDown(1501)).toEqual(500)
    expect(divideByAndRoundDown(1862)).toEqual(620)
    expect(divideByAndRoundDown(150)).toEqual(50)
    expect(divideByAndRoundDown(152)).toEqual(50)
    expect(divideByAndRoundDown(153)).toEqual(51)
});


describe.skip('part 1', () => {
    it("should return 10605", () => {
        const result = day11_1(testInput)
        expect(result).toEqual(10605)
    });
    it("should do the real thing", () => {
        const input = readText("day11.input")
        const result = day11_1(input)
        expect(result).toEqual(101436)
    });
});

describe.skip('part 2', () => {
    it("should play one round", () => {
        const result = day11_2(testInput, 1)
        expect(result).toEqual(24)
    });
    it("should play 20 rounds", () => {
        const result = day11_2(testInput, 20)
        expect(result).toEqual(10197)
    });
    it("should return 2713310158", () => {
        const result = day11_2(testInput)
        expect(result).toEqual(2713310158)
    });
    it("should do the real thing", () => {
        const input = readText("day11.input")
        const result = day11_2(input)
        expect(result).toEqual(19754471646)
    });
});
