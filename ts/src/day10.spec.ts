import { day10_1, day10_2 } from "./day10";
import { readLines } from "./util";

const easyInput = [
    "noop",
    "addx 3",
    "addx -5",
    "noop",
    "noop"
]
const testInput = [
    "addx 15",
    "addx -11",
    "addx 6",
    "addx -3",
    "addx 5",
    "addx -1",
    "addx -8",
    "addx 13",
    "addx 4",
    "noop",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx 5",
    "addx -1",
    "addx -35",
    "addx 1",
    "addx 24",
    "addx -19",
    "addx 1",
    "addx 16",
    "addx -11",
    "noop",
    "noop",
    "addx 21",
    "addx -15",
    "noop",
    "noop",
    "addx -3",
    "addx 9",
    "addx 1",
    "addx -3",
    "addx 8",
    "addx 1",
    "addx 5",
    "noop",
    "noop",
    "noop",
    "noop",
    "noop",
    "addx -36",
    "noop",
    "addx 1",
    "addx 7",
    "noop",
    "noop",
    "noop",
    "addx 2",
    "addx 6",
    "noop",
    "noop",
    "noop",
    "noop",
    "noop",
    "addx 1",
    "noop",
    "noop",
    "addx 7",
    "addx 1",
    "noop",
    "addx -13",
    "addx 13",
    "addx 7",
    "noop",
    "addx 1",
    "addx -33",
    "noop",
    "noop",
    "noop",
    "addx 2",
    "noop",
    "noop",
    "noop",
    "addx 8",
    "noop",
    "addx -1",
    "addx 2",
    "addx 1",
    "noop",
    "addx 17",
    "addx -9",
    "addx 1",
    "addx 1",
    "addx -3",
    "addx 11",
    "noop",
    "noop",
    "addx 1",
    "noop",
    "addx 1",
    "noop",
    "noop",
    "addx -13",
    "addx -19",
    "addx 1",
    "addx 3",
    "addx 26",
    "addx -30",
    "addx 12",
    "addx -1",
    "addx 3",
    "addx 1",
    "noop",
    "noop",
    "noop",
    "addx -9",
    "addx 18",
    "addx 1",
    "addx 2",
    "noop",
    "noop",
    "addx 9",
    "noop",
    "noop",
    "noop",
    "addx -1",
    "addx 2",
    "addx -37",
    "addx 1",
    "addx 3",
    "noop",
    "addx 15",
    "addx -21",
    "addx 22",
    "addx -6",
    "addx 1",
    "noop",
    "addx 2",
    "addx 1",
    "noop",
    "addx -10",
    "noop",
    "noop",
    "addx 20",
    "addx 1",
    "addx 2",
    "addx 2",
    "addx -6",
    "addx -11",
    "noop",
    "noop",
    "noop"
]

describe.skip('part 1', () => {
    it("should give easy test examples", () => {
        expect(day10_1(easyInput, 1)).toEqual(1)
        expect(day10_1(easyInput, 2)).toEqual(2)
        expect(day10_1(easyInput, 3)).toEqual(3)
        expect(day10_1(easyInput, 4)).toEqual(16)
        expect(day10_1(easyInput, 5)).toEqual(20)
        expect(day10_1(easyInput, 6)).toEqual(-6)
    });
    it("should return 13140", () => {
        const result = day10_1(testInput)
        expect(result).toEqual(13140)
    });
    it("should do the real thing", () => {
        const input = readLines("day10.input")
        const result = day10_1(input)
        expect(result).toEqual(14160)
    });
});

describe.skip('part 2', () => {
    it("should return pattern", () => {
        const result = day10_2(testInput)
        expect(result[0]).toEqual("##..##..##..##..##..##..##..##..##..##..")
        expect(result[1]).toEqual("###...###...###...###...###...###...###.")
        expect(result[2]).toEqual("####....####....####....####....####....")
        expect(result[3]).toEqual("#####.....#####.....#####.....#####.....")
        expect(result[4]).toEqual("######......######......######......####")
        expect(result[5]).toEqual("#######.......#######.......#######.....")
    });
    it("should do the real thing", () => {
        const input = readLines("day10.input")
        const result = day10_2(input)
        expect(result[0]).toEqual("###....##.####.###..###..####.####..##..")
        expect(result[1]).toEqual("#..#....#.#....#..#.#..#.#....#....#..#.")
        expect(result[2]).toEqual("#..#....#.###..#..#.#..#.###..###..#....")
        expect(result[3]).toEqual("###.....#.#....###..###..#....#....#....")
        expect(result[4]).toEqual("#.#..#..#.#....#.#..#....#....#....#..#.")
        expect(result[5]).toEqual("#..#..##..####.#..#.#....####.#.....##..")
    });
});
