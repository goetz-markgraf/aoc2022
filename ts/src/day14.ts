import { Pos } from "./day12";
import { isEqual } from "lodash";
import { range } from "remeda";

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

export type Matrix = number[][]

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

export const findBorders = (store: LineStore): [ number, number, number ] => {
    let deep = 0
    let left = Infinity
    let right = -Infinity
    store.horizontal.forEach(line => {
        if (line.fix > deep) deep = line.fix
        if (line.start < left) left = line.start
        if (line.end > right) right = line.end
    })
    store.vertical.forEach(line => {
        if (line.end > deep) deep = line.end
        if (line.fix < left) left = line.fix
        if (line.fix > right) right = line.fix
    })
    return [ deep, left, right ]
}

export const createMatrix = ([ bottom, left, right ]: [ number, number, number ]): Matrix => {
    let rightMost = Math.max(right, 500 + bottom) + 2
    return range(0, bottom + 2).map(_ => range(0, rightMost + 1).map(_ => 0))
}

export const fillLineInMatrix = (matrix: Matrix) => (line: Line) => {
    if (line.orientation === Orientation.HORIZONTAL) {
        for (let x = line.start; x <= line.end; x++) {
            matrix[line.fix][x] = 1
        }
    } else {
        for (let y = line.start; y <= line.end; y++) {
            matrix[y][line.fix] = 1
        }
    }
}

export const fillStoreInMatrix = (matrix: Matrix, store: LineStore) => {
    store.horizontal.forEach(line => fillLineInMatrix(matrix)(line))
    store.vertical.forEach(line => fillLineInMatrix(matrix)(line))
}

export const hitsAny = (pos: Pos, matrix: Matrix, bottom: number) =>
    pos.y === (bottom + 2) || (matrix[pos.y][pos.x] !== 0)


export const letFall = (matrix: Matrix, bottom: number, rock: boolean = false) => {
    let pos = { x: 500, y: 0 }
    if (hitsAny(pos, matrix, bottom))
        return pos

    let stop = false
    while (!stop && (rock || pos.y <= bottom)) {
        if (hitsAny({ x: pos.x, y: pos.y + 1 }, matrix, bottom)) {
            if (hitsAny({ x: pos.x - 1, y: pos.y + 1 }, matrix, bottom)) {
                if (hitsAny({ x: pos.x + 1, y: pos.y + 1 }, matrix, bottom)) {
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
    const [ bottom, left, right ] = findBorders(store)
    const matrix = createMatrix([ bottom, left, right ])
    fillStoreInMatrix(matrix, store)

    let lowest = false
    let count = 0
    while (!lowest) {
        const sandPos = letFall(matrix, bottom)
        if (sandPos.y > bottom)
            lowest = true
        else {
            matrix[sandPos.y][sandPos.x] = 2
            count++
        }
    }

    return count
}

export const day14_2 = (input: string[]) => {
    const lines: Line[] = input.flatMap(convertToLines)
    const store = makeStore(lines)
    const [ bottom, left, right ] = findBorders(store)
    const matrix = createMatrix([ bottom, left, right ])
    fillStoreInMatrix(matrix, store)

    let full = false
    let count = 0
    while (!full) {
        const sandPos = letFall(matrix, bottom)
        if (isEqual(sandPos, { x: 500, y: 0 }))
            full = true
        else
            matrix[sandPos.y][sandPos.x] = 2

        count++
    }

    return count
}
