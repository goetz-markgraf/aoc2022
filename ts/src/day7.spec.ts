import { day71, day72 } from "./day7";
import { readLines } from "./util";

const testInput = [
    "$ cd /",
    "$ ls",
    "dir a",
    "14848514 b.txt",
    "8504156 c.dat",
    "dir d",
    "$ cd a",
    "$ ls",
    "dir e",
    "29116 f",
    "2557 g",
    "62596 h.lst",
    "$ cd e",
    "$ ls",
    "584 i",
    "$ cd ..",
    "$ cd ..",
    "$ cd d",
    "$ ls",
    "4060174 j",
    "8033020 d.log",
    "5626152 d.ext",
    "7214296 k"
]

describe('part 1', () => {
    it("should return 95437", () => {
        const result = day71(testInput)
        expect(result).toEqual(95437)
    });
    it("should do the real thing", () => {
        const input = readLines("day7.input")
        const result = day71(input)
        expect(result).toEqual(1348005)
    });
});

describe('part 2', () => {
    it("should return 24933642", () => {
        const result = day72(testInput)
        expect(result).toEqual(24933642)
    });
    it("should do the real thing", () => {
        const input = readLines("day7.input")
        const result = day72(input)
        expect(result).toEqual(12785886)
    });
});
