import { add, sortDesc } from "./util";

const splitAllByEmptyString = (array: string[]): string[][] => {
    const ret: string[][] = []
    let current: string[]= []
    array.forEach(item => {
        if (item === "") {
            ret.push(current)
            current = []
        } else {
            current.push(item)
        }
    })
    if (current.length > 0) ret.push(current)

    return ret
}

const calculateElves = (buckets: string[][]) =>
    buckets
        .map(elfList =>
            elfList
                .map(i => parseInt(i))
                .reduce(add, 0)
        )


export const day11 = (input: string[]) => {
    const elves = splitAllByEmptyString(input)
    const calories = calculateElves(elves)

    calories.sort(sortDesc)
    return calories[0]
}


export const day12 = (input: string[]) => {
    const elves = splitAllByEmptyString(input)
    const calories = calculateElves(elves)
    calories.sort(sortDesc)
    return calories[0] + calories[1] + calories[2]
}
