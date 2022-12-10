import { filter, identity, map, pipe, sumBy } from "remeda";

const calculateCyleRegisterValues = (input: string[]): number[] => {
    let x = 1
    const ret: number[] = [ 0, 1 ] // two numbers, 0 for zero base and 1 for start of first cycle
    input.forEach(line => {
        if (line == "noop") ret.push(x)
        if (line.slice(0, 4) === "addx") {
            const delta = parseInt(line.slice(5))
            ret.push(x)
            x += delta
            ret.push(x)
        }
    })
    return ret
}

export const day10_1 = (input: string[], testCycle: number = 20) => {
    const xValues = calculateCyleRegisterValues(input)
    return pipe(
        [ testCycle, 60, 100, 140, 180, 220 ],
        filter(value => value < xValues.length),
        map(cycle => xValues[cycle] * cycle),
        sumBy(identity)
    )
}

export const day10_2 = (input: string[]): string[] => {
    const xValue = calculateCyleRegisterValues(input)
    let pixelDif = 1
    let line: boolean[] = []
    const ret: string[] = []
    for (let cycle = 1; cycle <= 240; cycle++) {
        const pixel = cycle - pixelDif
        if (xValue[cycle] > pixel - 2 && xValue[cycle] < pixel + 2)
            line.push(true)
        else
            line.push(false)

        if (cycle % 40 === 0) {
            const lineString = line.map(value => value ? "#" : ".").join("")
            ret.push(lineString)
            line = []
            pixelDif += 40
        }
    }
    return ret
}
