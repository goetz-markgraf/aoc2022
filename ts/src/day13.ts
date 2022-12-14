import { filter, findIndex, identity, map, pipe, sumBy } from "remeda";
import { isEqual } from "lodash";

export type Element = number | Element[]

export const makePairStrings = (input: string): [ string, string ][] =>
// @ts-ignore
    pipe(
        input.split("\n\n"),
        map(pair => pair.split("\n"))
    )

const compareArray = (e1: Element[], e2: Element[]) => {
    for (let i = 0; i < e1.length && i < e2.length; i++) {
        const ret = compare(e1[i], e2[i])
        if (ret !== undefined) return ret
    }
    if (e1.length < e2.length)
        return true
    if (e1.length > e2.length)
        return false

    return undefined
}

export const compare = (e1: Element, e2: Element): boolean | undefined => {
    if (e1 === undefined && e2 !== undefined)
        return true
    if (e1 !== undefined && e2 === undefined)
        return false

    const t1 = typeof e1
    const t2 = typeof e2

    if (t1 === "number" && t2 === "number") {
        if (e1 < e2) return true
        if (e1 > e2) return false
        return undefined
    }

    if (t1 === "number")
        e1 = [ e1 ] as Element[]

    if (t2 === "number")
        e2 = [ e2 ] as Element[]

    return compareArray(e1 as Element[], e2 as Element[])
}

export const forceCompare = (e1: Element, e2: Element): number => {
    const ret = compare(e1, e2)
    if (ret !== undefined)
        return ret ? -1 : 1
    else
        return 0
}


export const makePairObjects = ([ s1, s2 ]: [ string, string ]): [ Element[], Element[] ] => {
    const a1 = eval(s1)
    const a2 = eval(s2)
    return [ a1, a2 ]
}

export const day13_1 = (input: string) => {
    const pairStrings = makePairStrings(input)
    const pairs = pipe(
        pairStrings,
        map(makePairObjects),
    )
    return pipe(
        pairs,
        map.indexed((e, i) => compare(e[0], e[1]) ? i + 1 : 0),
        filter(i => i > 0),
        sumBy(identity)
    )
}

export const day13_2 = (input: string) => {
    const lineStrings = input.split("\n").filter(s => s.trim().length > 0)
    const lines = lineStrings.map(line => eval(line) as Element[])
    lines.push([ [ 2 ] ], [ [ 6 ] ])
    lines.sort((e1, e2) => forceCompare(e1, e2))
    const i1 = findIndex(lines, (line) => isEqual(line, [ [ 2 ] ])) + 1
    const i2 = findIndex(lines, (line) => isEqual(line, [ [ 6 ] ])) + 1
    return i1 * i2
}
