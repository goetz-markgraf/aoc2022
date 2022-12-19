import { filter, range, sortBy } from "remeda";

export interface Sensor {
    x: number,
    y: number,
    bx: number
    by: number,
    dist: number
}

export const createSensorFromLine = (line: string): Sensor => {
    const strings = line.split(" ")
    const x = parseInt(strings[2].substring(2))
    const y = parseInt(strings[3].substring(2))
    const bx = parseInt(strings[8].substring(2))
    const by = parseInt(strings[9].substring(2))
    const dist = Math.abs(bx - x) + Math.abs(by - y)

    return { x, y, bx, by, dist }
}

export type Chunk = [ number, number ];

export const createSensors = (input: string[]): Sensor[] =>
    input.map(line => createSensorFromLine(line))

export const isBlockingOnLine = (sensor: Sensor, line: number): boolean => {
    const dist = Math.abs(line - sensor.y)
    return dist <= sensor.dist
}

export const findBlockingSensors = (sensors: Sensor[], line: number) =>
    filter(sensors,
        sensor => isBlockingOnLine(sensor, line))

export const findMinMax = (sensors: Sensor[]): [ number, number ] => {
    let min = Infinity
    let max = -Infinity
    sensors.forEach(s => {
        const sMin = s.x - s.dist
        const sMax = s.x + s.dist
        if (sMin < min) min = sMin
        if (sMax > max) max = sMax
    })

    return [ min, max ]
}

export const blockingWidth = (sensor: Sensor, line: number) =>
    sensor.dist - Math.abs(line - sensor.y)

function fillLine(sensors: Sensor[], line: number, observedLine: number[], min: number) {
    const blockingSensors = sensors.filter(s => isBlockingOnLine(s, line))
    blockingSensors.forEach(s => {
        const additional = blockingWidth(s, line)
        range(s.x - additional, s.x + additional + 1).forEach(pos =>
            observedLine[pos - min] = 1
        )
    })
    return blockingSensors;
}

export const findChunks = (sensors: Sensor[], line: number) => {
    const ret: Chunk[] = []
    findBlockingSensors(sensors, line).forEach(s => {
        const width = blockingWidth(s, line)
        ret.push([ s.x - width, s.x + width ])
    })
    return ret
}

export const analyzeChunks = (chunks: Chunk[], maxXY: number): number => {
    const sorted = sortBy(chunks, c => c[0])
    let end = 0
    let overlap = Infinity
    for (let i = 0; i < sorted.length && overlap >= 0 && end <= maxXY; i++) {
        const chunk = sorted[i]
        const newOverlap = end - chunk[0] - 1
        if (newOverlap < 0)
            return end === 0 ? end : -end

        if (newOverlap < overlap) overlap = newOverlap

        if (chunk[1] <= end)
            continue

        end = chunk[1] + 1
    }
    return overlap
}

export const day15_1 = (input: string[], line: number) => {
    const sensors = createSensors(input)
    const [ min, max ] = findMinMax(sensors)
    const observedLine = range(min, max + 1).map(_ => 0)

    const blockingSensors = fillLine(sensors, line, observedLine, min);

    blockingSensors.forEach(s => {
            if (s.y === line) observedLine[s.x - min] = 2
            if (s.by === line) observedLine[s.bx - min] = 2
        }
    )
    return observedLine.filter(v => v === 1).length
}

export const day15_2 = (input: string[], maxXY: number) => {
    const sensors = createSensors(input)
    const [ min, max ] = findMinMax(sensors)
    let coordinates: [ number, number ] | undefined = undefined

    for (let y = 0; y <= maxXY; y++) {
        let observedLine = range(min, max + 1).map(_ => 0)
        fillLine(sensors, y, observedLine, min)

        for (let x = 0; x <= maxXY; x++) {
            if (observedLine[x - min] === 0) {
                coordinates = [ x, y ]
                break
            }
        }
        if (coordinates) break
        if (y % 50 === 0)
            console.log("y", y);
    }

    if (coordinates) return coordinates[0] * 4000000 + coordinates[1]
    else return undefined
}

export const day15_2_alt = (input: string[], maxXY: number) => {
    const sensors = createSensors(input)
    for (let y = 0; y <= maxXY; y++) {
        const chunks = findChunks(sensors, y)
        const ana = analyzeChunks(chunks, maxXY)
        if (ana < 0)
            return (-ana) * 4000000 + y

        y += Math.round(ana / 2)
    }
    return undefined
}
