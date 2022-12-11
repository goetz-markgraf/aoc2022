import { drop, map, pipe, sortBy } from "remeda";

export interface Monkey {
    items: number[],
    operation: (number) => number,
    testDivisor: number,
    trueTargetMonkey: number,
    falseTargetMonkey: number,
    inspections: number
}

const extractNumbers = (itemString: string) => {
    const numberString = itemString.substring(itemString.indexOf(":") + 1).trim()
    const numberStrings = numberString.split(", ")
    return map(numberStrings, parseInt)
}

const lastNumber = (s: string) =>
    parseInt(s.substring(s.lastIndexOf(" ")).trim())

export const defineFunction = (funcString: string) => {
    const timesFunc =
        (times: number) => (i: number) => i * times
    const addFunc =
        (add: number) =>
            (i: number) => i + add
    const squareFunc =
        (i: number) => i * i

    const expression = funcString.substring(funcString.indexOf("=") + 1).trim()
    if (expression === "old * old")
        return squareFunc
    if (expression.startsWith("old *"))
        return timesFunc(lastNumber(expression))
    return addFunc(lastNumber(expression))
}

export const createMonkey = (monkeyCode: string, index: number): Monkey => {
    const lines = monkeyCode.split("\n").map(line => line.trim())
    if (lines[0].substring(7, 8) !== `${ index }`) throw new Error("Wrong Monkey definition")

    const items = extractNumbers(lines[1])
    const operation = defineFunction(lines[2])
    const testDivisor = lastNumber(lines[3])
    const trueTargetMonkey = lastNumber(lines[4])
    const falseTargetMonkey = lastNumber(lines[5])

    return {
        items, operation, testDivisor, trueTargetMonkey, falseTargetMonkey,
        inspections: 0
    }
}

export const divideByAndRoundDown = (input: number, divisor: number = 3) =>
    Math.round((input / divisor) - 0.5)

export const manageLevel = (currLevel: number, divider: number) =>
    divider + (currLevel % divider)


const doMonkey = (monkeyNumber: number, monkeys: Monkey[], reducer?: number) => {
    const m = monkeys[monkeyNumber]
    m.inspections += m.items.length
    for (const item of m.items) {
        const newValue = m.operation(item)
        const roundedValue = reducer ? manageLevel(newValue, reducer) : divideByAndRoundDown(newValue, reducer)
        const test = (roundedValue % m.testDivisor) === 0
        const target = test ? m.trueTargetMonkey : m.falseTargetMonkey
        monkeys[target].items.push(roundedValue)
    }
    while (m.items.length > 0) m.items.pop()
}

export const day11_1 = (input: string, rounds: number = 20) => {
    const monkeyCode = input.split("\n\n")
    const monkeys = map.indexed(monkeyCode, createMonkey)

    for (let round = 0; round < rounds; round++) {
        for (let monkeyNumber = 0; monkeyNumber < monkeys.length; monkeyNumber++) {
            doMonkey(monkeyNumber, monkeys)
        }
    }
    const inspections = pipe(
        monkeys,
        sortBy(m => m.inspections),
        drop(monkeys.length - 2),
        map(m => m.inspections)
    )
    return inspections[0] * inspections[1]
}

const createReducer = (monkeys: Monkey[]) => {
    const divisors = monkeys.map(m => m.testDivisor)
    return divisors.reduce((a, b) => a * b, 1)
}

export const day11_2 = (input: string, rounds: number = 10000) => {
    const monkeyCode = input.split("\n\n")
    const monkeys = map.indexed(monkeyCode, createMonkey)
    const reducer = createReducer(monkeys)

    for (let round = 0; round < rounds; round++) {
        for (let monkeyNumber = 0; monkeyNumber < monkeys.length; monkeyNumber++) {
            doMonkey(monkeyNumber, monkeys, reducer)
        }
    }
    const inspections = pipe(
        monkeys,
        sortBy(m => m.inspections),
        drop(monkeys.length - 2),
        map(m => m.inspections)
    )
    return inspections[0] * inspections[1]
}
