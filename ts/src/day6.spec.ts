import { day61, day62 } from "./day6";
import { readLines } from "./util";

describe('part 1', () => {
    it("should master the examples", () => {
        expect(day61("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toEqual(7)
        expect(day61("bvwbjplbgvbhsrlpgdmjqwftvncz")).toEqual(5)
        expect(day61("nppdvjthqldpwncqszvftbrmjlhg")).toEqual(6)
        expect(day61("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toEqual(10)
        expect(day61("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toEqual(11)
    });
    it("should do the real thing", () => {
        const lines = readLines("day6.input")
        expect(day61(lines[0])).toEqual(1155)
    });
});

describe('part 2', () => {
    it("should master the examples", () => {
        expect(day62("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toEqual(19)
        expect(day62("bvwbjplbgvbhsrlpgdmjqwftvncz")).toEqual(23)
        expect(day62("nppdvjthqldpwncqszvftbrmjlhg")).toEqual(23)
        expect(day62("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toEqual(29)
        expect(day62("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toEqual(26)
    });
    it("should do the real thing", () => {
        const lines = readLines("day6.input")
        expect(day62(lines[0])).toEqual(2789)
    });
});
