import { Pos } from "./day12";
import { isEqual } from "lodash";
import { find } from "remeda";

export enum Orientation {
    HORIZONTAL, VERTICAL
}

export interface Line {
    orientation: Orientation,
    fix: number,
    start: number,
    end: number
}

export interface LineStore {
    horizontal: Line[],
    vertical: Line[]
}

export const makePos = (coordinateString: string): Pos => {
    const cStrings = coordinateString.split(",")
    return { x: parseInt(cStrings[0]), y: parseInt(cStrings[1]) }
}

export const convertToLines = (line: string): Line[] => {
    const coordinateStrings = line.split("->").map(s => s.trim())
    const ret: Line[] = []
    for (let i = 0; i < coordinateStrings.length - 1; i++) {
        const beginPos = makePos(coordinateStrings[i])
        const endPos = makePos(coordinateStrings[i + 1])

        if (beginPos.x == endPos.x) {
            const smaller = Math.min(beginPos.y, endPos.y)
            const greater = Math.max(beginPos.y, endPos.y)
            ret.push({
                orientation: Orientation.VERTICAL,
                fix: beginPos.x,
                start: smaller,
                end: greater
            })
        } else {
            const smaller = Math.min(beginPos.x, endPos.x)
            const greater = Math.max(beginPos.x, endPos.x)
            ret.push({
                orientation: Orientation.HORIZONTAL,
                fix: beginPos.y,
                start: smaller,
                end: greater
            })
        }
    }

    return ret
}

export const makeStore = (lines: Line[]): LineStore => ({
    horizontal: lines.filter(line => line.orientation === Orientation.HORIZONTAL),
    vertical: lines.filter(line => line.orientation === Orientation.VERTICAL)
})

export const hitsLine = (pos: Pos, store: LineStore): boolean => {
    const hLines = store.horizontal.filter(line => line.fix === pos.y)
    const vLines = store.vertical.filter(line => line.fix === pos.x)
    if (hLines.length === 0 && vLines.length === 0) return false

    let ret = false
    hLines.forEach(line => {
        if (pos.x >= line.start && pos.x <= line.end)
            ret = true
    })
    vLines.forEach(line => {
        if (pos.y >= line.start && pos.y <= line.end)
            ret = true
    })
    return ret
}

export const hitsSand = (pos: Pos, sandStore: Pos[]) =>
    find(sandStore, sPos => isEqual(pos, sPos)) !== undefined


export const findLowestPoint = (store: LineStore) => {
    let deep = 0
    store.horizontal.forEach(line => {
        if (line.fix > deep) deep = line.fix
    })
    store.vertical.forEach(line => {
        if (line.end > deep) deep = line.end
    })
    return deep
}

export const hitsAny = (pos: Pos, store: LineStore, sandStore: Pos[], lowestPoint: number) =>
    pos.y === lowestPoint + 2 || hitsLine(pos, store) || hitsSand(pos, sandStore)

export const letFall = (store: LineStore, sandStore: Pos[], lowestPoint: number, rock: boolean = false) => {
    let pos = { x: 500, y: 0 }
    if (hitsAny(pos, store, sandStore, lowestPoint))
        return pos

    let stop = false
    while (!stop && (rock || pos.y <= lowestPoint)) {
        if (hitsAny({ x: pos.x, y: pos.y + 1 }, store, sandStore, lowestPoint)) {
            if (hitsAny({ x: pos.x - 1, y: pos.y + 1 }, store, sandStore, lowestPoint)) {
                if (hitsAny({ x: pos.x + 1, y: pos.y + 1 }, store, sandStore, lowestPoint)) {
                    stop = true
                } else
                    pos = { x: pos.x + 1, y: pos.y + 1 }
            } else {
                pos = { x: pos.x - 1, y: pos.y + 1 }
            }
        } else {
            pos = { x: pos.x, y: pos.y + 1 }
        }
    }
    return pos
}

export const day14_1 = (input: string[]) => {
    const lines: Line[] = input.flatMap(convertToLines)
    const store = makeStore(lines)
    const lowestPoint = findLowestPoint(store)

    const sandStore: Pos[] = []
    let lowest = false
    while (!lowest) {
        const sandPos = letFall(store, sandStore, lowestPoint)
        if (sandPos.y > lowestPoint)
            lowest = true
        else
            sandStore.push(sandPos)
    }

    return sandStore.length
}

export const day14_2 = (input: string[]) => {
    const lines: Line[] = input.flatMap(convertToLines)
    const store = makeStore(lines)
    const lowestPoint = findLowestPoint(store)

    const sandStore: Pos[] = []
    let full = false
    while (!full) {
        const sandPos = letFall(store, sandStore, lowestPoint)
        if (isEqual(sandPos, { x: 500, y: 0 }))
            full = true

        sandStore.push(sandPos)

        if (sandStore.length % 50 === 0)
            console.log(`count: ${ sandStore.length } – x:${ sandPos.x }, y:${ sandPos.y }`);
    }

    return sandStore.length
}
