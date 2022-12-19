import {
    analyzeChunks,
    blockingWidth,
    createSensorFromLine,
    createSensors,
    day15_1,
    day15_2_alt,
    findChunks,
    findMinMax,
    isBlockingOnLine
} from "./day15";
import { readLines } from "./util";

const testInput = [
    "Sensor at x=2, y=18: closest beacon is at x=-2, y=15",
    "Sensor at x=9, y=16: closest beacon is at x=10, y=16",
    "Sensor at x=13, y=2: closest beacon is at x=15, y=3",
    "Sensor at x=12, y=14: closest beacon is at x=10, y=16",
    "Sensor at x=10, y=20: closest beacon is at x=10, y=16",
    "Sensor at x=14, y=17: closest beacon is at x=10, y=16",
    "Sensor at x=8, y=7: closest beacon is at x=2, y=10",
    "Sensor at x=2, y=0: closest beacon is at x=2, y=10",
    "Sensor at x=0, y=11: closest beacon is at x=2, y=10",
    "Sensor at x=20, y=14: closest beacon is at x=25, y=17",
    "Sensor at x=17, y=20: closest beacon is at x=21, y=22",
    "Sensor at x=16, y=7: closest beacon is at x=15, y=3",
    "Sensor at x=14, y=3: closest beacon is at x=15, y=3",
    "Sensor at x=20, y=1: closest beacon is at x=15, y=3"
]

describe('details', () => {
    const sensors = createSensors(testInput)

    it("should parse line 0 correctly", () => {
        const sensor = createSensorFromLine("Sensor at x=2, y=18: closest beacon is at x=-2, y=15")
        expect(sensor).toEqual({ x: 2, y: 18, bx: -2, by: 15, dist: 7 })
    });
    it("should parse line 9 correctly", () => {
        const sensor = createSensorFromLine("Sensor at x=20, y=14: closest beacon is at x=25, y=17")
        expect(sensor).toEqual({ x: 20, y: 14, bx: 25, by: 17, dist: 8 })
    });
    it("should parse all sensors", () => {
        expect(sensors.length).toEqual(14)
    });
    it("should find a non interfering sensor", () => {
        expect(isBlockingOnLine(sensors[1], 10)).toBeFalsy()
        expect(isBlockingOnLine(sensors[1], 11)).toBeFalsy()
        expect(isBlockingOnLine(sensors[1], 16)).toBeTruthy()
        expect(isBlockingOnLine(sensors[1], 15)).toBeTruthy()
    });
    it("should calculate the width of the grid", () => {
        const [ min, max ] = findMinMax(sensors)
        expect(min).toEqual(-8)
        expect(max).toEqual(28)
    });
    it("should calculate the blockingWidth", () => {
        expect(isBlockingOnLine(sensors[6], 16)).toBeTruthy()
        expect(blockingWidth(sensors[6], 16)).toEqual(0)
        expect(blockingWidth(sensors[6], 15)).toEqual(1)
    });
    it("should find the correct chunks", () => {
        const chunks = findChunks(sensors, 16)
        expect(chunks.length).toEqual(8)
    });
    it("should analyze line 10", () => {
        const chunks = findChunks(sensors, 10)
        const result = analyzeChunks(chunks, 20)
        expect(result).toEqual(0)
    });
    it("should analyze line 11", () => {
        const chunks = findChunks(sensors, 11)
        const result = analyzeChunks(chunks, 20)
        expect(result).toEqual(-14)
    });
});

describe('part 1', () => {
    it("should return 26", () => {
        const result = day15_1(testInput, 10)
        expect(result).toEqual(26)
    });
    it("should do the real thing", () => {
        const input = readLines("day15.input")
        const result = day15_1(input, 2000000)
        expect(result).toEqual(5073496)
    });
});

describe('part 2', () => {
    it("should return 56000011", () => {
        const result = day15_2_alt(testInput, 20)
        expect(result).toEqual(56000011)
    });
    it("should to the real thing", () => {
        const input = readLines("day15.input")
        const result = day15_2_alt(input, 4000000)
        expect(result).toEqual(13081194638237)
    });
});
