import { countBy, map, pipe, range } from "remeda"

const isInclude = (pair: number[][]) =>
    (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1])

const hasOverlap = (pair: number[][]) => {
    const begin1 = pair[0][0]
    const end1 = pair[0][1]
    const begin2 = pair[1][0]
    const end2 = pair[1][1]

    return range(begin1, end1 + 1).includes(begin2) ||
        range(begin1, end1 + 1).includes(end2) ||
        range(begin2, end2 + 1).includes(begin1) ||
        range(begin2, end2 + 1).includes(end1)
}

export const day41 = (input: string[]) =>
    pipe(
        input,
        map(line => line.split(",").map(pair => pair.split("-").map(i => parseInt(i)))),
        countBy(isInclude)
    )

export const day42 = (input: string[]) =>
    pipe(
        input,
        map(line => line.split(",").map(pair => pair.split("-").map(i => parseInt(i)))),
        countBy(hasOverlap)
    )
