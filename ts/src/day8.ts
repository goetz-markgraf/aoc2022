import { concat, uniq } from "remeda";

type Field = number[][]
type Pos = number

const toPos = (x: number, y: number) => x * 1000 + y

export const toField = (input: string[]): Field =>
    input.map(line =>
        line.split("").map(ch => parseInt(ch))
    )

const visibleHorizontal = (field: Field) => {
    const ret: Pos[] = []
    let done: boolean

    for (let y = 0; y < field.length; y++) {
        done = false
        let maxSize = -1
        for (let x = 0; x < field[0].length && !done; x++) {
            const height = field[y][x]
            if (height > maxSize) {
                ret.push(toPos(x, y))
                maxSize = height
            }
            if (maxSize === 9)
                done = true
        }
        maxSize = -1
        done = false
        for (let x = field[0].length - 1; x >= 0 && !done; x--) {
            const height = field[y][x]
            if (height > maxSize) {
                ret.push(toPos(x, y))
                maxSize = height
            }
            if (maxSize === 9)
                done = true
        }
    }
    return ret
}

const visibleVertical = (field: Field) => {
    const ret: Pos[] = []
    let done: boolean
    for (let x = 0; x < field[0].length; x++) {
        done = false
        let maxSize = -1
        for (let y = 0; y < field.length && !done; y++) {
            const height = field[y][x]
            if (height > maxSize) {
                ret.push(toPos(x, y))
                maxSize = height
            }
            if (maxSize === 9)
                done = true
        }
        done = false
        maxSize = -1
        for (let y = field.length - 1; y >= 0 && !done; y--) {
            const height = field[y][x]
            if (height > maxSize) {
                ret.push(toPos(x, y))
                maxSize = height
            }
            if (maxSize === 9)
                done = true
        }
    }
    return ret
}

export const calcSenicScore = (field: Field, x: number, y: number) => {
    let up: number = 0, left: number = 0, right: number = 0, down: number = 0
    let done: boolean
    const centerHeight = field[y][x]

    // going up
    done = false
    for (let yd = y - 1; yd >= 0 && !done; yd--) {
        const height = field[yd][x]
        up++
        if (height >= centerHeight)
            done = true
    }

    // going down
    done = false
    for (let yd = y + 1; yd < field.length && !done; yd++) {
        const height = field[yd][x]
        down++
        if (height >= centerHeight)
            done = true
    }

    // going left
    done = false
    for (let xd = x - 1; xd >= 0 && !done; xd--) {
        const height = field[y][xd]
        left++
        if (height >= centerHeight)
            done = true
    }

    // going right
    done = false
    for (let xd = x + 1; xd < field[0].length && !done; xd++) {
        const height = field[y][xd]
        right++
        if (height >= centerHeight)
            done = true
    }

    return up * down * left * right
}

export const day81 = (input: string[]) => {
    const field = toField(input)
    const totalPos = concat(visibleHorizontal(field), visibleVertical(field))
    const uniqPos = uniq(totalPos)
    return uniqPos.length
}

export const day82 = (input: string[]) => {
    const field = toField(input)
    let maxScore = 0
    for (let x = 0; x < field[0].length; x++) {
        for (let y = 0; y < field.length; y++) {
            const score = calcSenicScore(field, x, y)
            if (score > maxScore)
                maxScore = score
        }
    }
    return maxScore
} 
