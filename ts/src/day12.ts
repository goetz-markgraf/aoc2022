import { concat, filter, findIndex, map, pipe, sortBy } from "remeda";
import { isEqual } from "lodash";

export interface Pos {
    x: number,
    y: number
}

export type Matrix = string[][]

export type Path = Pos[]

export const createMatrix = (input: string[]): Matrix =>
    input.map(line => line.split(""))

export const findField = (matrix: Matrix, content: string): Pos => {
    const ret: Pos = { x: -1, y: -1 }

    ret.y = findIndex(matrix, line => {
            const x = findIndex(line, ch => ch === content)
            if (x >= 0) ret.x = x
            return x >= 0
        }
    )

    return ret
}

export const heightValue = (matrix: Matrix, { x, y }: Pos): string => {
    let v = matrix[y][x]
    if (v === "S") v = "a"
    if (v === "E") v = "z"
    return v
}

export const fits = (current: string, next: string): boolean => {
    const currentChar = current.charCodeAt(0)
    const nextChar = next.charCodeAt(0)
    return (currentChar + 1) >= nextChar
}

const cmpPos = (pos1: Pos, pos2: Pos) =>
    isEqual(pos1, pos2)


export const isInPath = (path: Path, pos: Pos) => {
    for (let i = 0; i < path.length; i++) {
        if (cmpPos(path[i], pos))
            return true
    }
    return false
}

export const findPaths = (matrix: Matrix, path: Path, downwards: boolean = false): Path[] => {
    const lastPos = path[path.length - 1]

    const newPossiblePos: Pos[] = []
    lastPos.y > 0 ? newPossiblePos.push({ x: lastPos.x, y: lastPos.y - 1 }) : undefined
    lastPos.x > 0 ? newPossiblePos.push({ x: lastPos.x - 1, y: lastPos.y }) : undefined
    lastPos.y < matrix.length - 1 ? newPossiblePos.push({ x: lastPos.x, y: lastPos.y + 1 }) : undefined
    lastPos.x < matrix[0].length - 1 ? newPossiblePos.push({ x: lastPos.x + 1, y: lastPos.y }) : undefined

    return pipe(
        newPossiblePos,
        map(pos => {
                const lower = downwards ? pos : lastPos
                const higher = downwards ? lastPos : pos
                return fits(heightValue(matrix, lower), heightValue(matrix, higher))
                    ? pos
                    : undefined
            }
        ),
        filter(pos => pos !== undefined),
        filter(pos => !isInPath(path, pos!)),
        map(pos => [ ...path, pos! ])
    )
}

const checkPath = (path: Path, endPos: Pos) =>
    cmpPos(path[path.length - 1], endPos)


const cleanUpPaths = (paths: Path[]): Path[] => {
    const sorted = sortBy(paths, p => p.length)
    const ret: Path[] = []
    for (let outer = sorted.length - 1; outer >= 0; outer--) {
        const path = sorted[outer]
        const lastPos = path[path.length - 1]

        let included = false
        for (let inner = 0; inner < outer; inner++) {
            if (isInPath(sorted[inner], lastPos))
                included = true
        }
        if (!included)
            ret.push(path)
    }
    return ret
}


export const day12_1 = (input: string[]) => {
    const matrix = createMatrix(input)
    const startPos = findField(matrix, "S")
    const endPos = findField(matrix, "E")
    let paths: Path[] = [ [ startPos ] ]
    let counter = 0
    while (paths.length > 0) {
        paths = sortBy(paths, p => p.length - heightValue(matrix, p[p.length - 1]).charCodeAt(0))
        const firstPath = paths.shift()!
        if (checkPath(firstPath, endPos))
            return firstPath.length - 1

        const newPaths = findPaths(matrix, firstPath)
        paths = concat(paths, newPaths)
        paths = cleanUpPaths(paths)
        counter++
        if (counter % 50 === 0)
            console.log(`Counter: ${ counter } – length shortest path: ${ firstPath.length }`);
    }

    return -1
}

export const day12_2 = (input: string[]) => {
    const matrix = createMatrix(input)
    const startPos = findField(matrix, "E")
    let paths: Path[] = [ [ startPos ] ]
    let counter = 0
    while (paths.length > 0) {
        paths = sortBy(paths, p => p.length - heightValue(matrix, p[p.length - 1]).charCodeAt(0))
        const firstPath = paths.shift()!

        if (heightValue(matrix, firstPath[firstPath.length - 1]) === "a") {
            return firstPath.length - 1
        }

        const newPaths = findPaths(matrix, firstPath, true)
        paths = concat(paths, newPaths)
        paths = cleanUpPaths(paths)
        counter++
        if (counter % 50 === 0)
            console.log(`Counter: ${ counter } – length shortest path: ${ firstPath.length } to ${ heightValue(matrix, firstPath[firstPath.length - 1]) }`);
    }

    return -1
}
