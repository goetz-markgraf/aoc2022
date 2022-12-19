import { forEach, pipe, sumBy } from "remeda";

export interface Pos {
    x: number,
    y: number,
    z: number,
}

export enum Side {
    XM = "XM",
    XP = "XP",
    YM = "YM",
    YP = "YP",
    ZM = "ZM",
    ZP = "ZP"
}

export interface Cube {
    pos: Pos
    sides: boolean[]
}

export const lineToCube = (line: string): Cube => {
    const pos = line.split(",")
    const sides = [ true, true, true, true, true, true ]
    return {
        pos: {
            x: parseInt(pos[0]),
            y: parseInt(pos[1]),
            z: parseInt(pos[2])
        },
        sides: sides
    }
}

export const samePos = (pos1: Pos, pos2: Pos) =>
    pos1.x === pos2.x
    && pos1.y === pos2.y
    && pos1.z === pos2.z

export const givePos = (pos: Pos, side: Side): Pos => {
    switch (side) {
        case Side.XM:
            return { x: pos.x - 1, y: pos.y, z: pos.z }
        case Side.XP:
            return { x: pos.x + 1, y: pos.y, z: pos.z }
        case Side.YM:
            return { x: pos.x, y: pos.y - 1, z: pos.z }
        case Side.YP:
            return { x: pos.x, y: pos.y + 1, z: pos.z }
        case Side.ZM:
            return { x: pos.x, y: pos.y, z: pos.z - 1 }
        case Side.ZP:
            return { x: pos.x, y: pos.y, z: pos.z + 1 }
    }
}

export const sameSide = (q1: Cube) => (q2: Cube): [ Cube, Side ] | undefined => {
    for (const side of Object.values(Side)) {
        const p1 = givePos(q1.pos, side)
        if (samePos(p1, q2.pos))
            return [ q2, side ]
    }
    return undefined
}

export const matchSides = (q1: Cube, q2: Cube, side: Side) => {
    switch (side) {
        case Side.XM:
            q1.sides[0] = false
            q2.sides[1] = false
            break
        case Side.XP:
            q1.sides[1] = false
            q2.sides[0] = false
            break
        case Side.YM:
            q1.sides[2] = false
            q2.sides[3] = false
            break
        case Side.YP:
            q1.sides[3] = false
            q2.sides[2] = false
            break
        case Side.ZM:
            q1.sides[4] = false
            q2.sides[5] = false
            break
        case Side.ZP:
            q1.sides[5] = false
            q2.sides[4] = false
            break
    }
}

export const countTrue = (sides: boolean[]): number =>
    sumBy(sides, s => s ? 1 : 0)

export const day18_1 = (input: string[]) => {
    const cubes = input.map(lineToCube)

    pipe(
        cubes,
        forEach.indexed((q1, i) => {
            const adjacent = cubes.slice(i + 1)
                .map(sameSide(q1))
                .filter(x => x !== undefined)
            // @ts-ignore
            adjacent.forEach(([ q, s ]) => matchSides(q1, q, s))
        })
    )

    return sumBy(cubes, q => countTrue(q.sides))
}

export const day18_1_alt = (input: string[]) => {
    const cubes = input.map(lineToCube)
    let count = cubes.length * 6

    pipe(
        cubes,
        forEach.indexed((q1, i) => {
            count -= (cubes.slice(i + 1)
                .map(sameSide(q1))
                .filter(x => x !== undefined)
                .length) * 2
        })
    )

    return count
}
