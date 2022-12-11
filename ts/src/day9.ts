import { forEach, range, times, uniq } from "remeda";

export interface Pos {
    x: number,
    y: number
}

type PosItem = string

export const toPosItem = (p: Pos): PosItem => `x:${ p.x },y:${ p.y }`

interface Game1 {
    headPos: Pos,
    tailPos: Pos,
    tailPosList: PosItem[]
}

interface Game10 {
    tailPos: Pos[],
    tailPosList: PosItem[]
}

const initGame1 = (): Game1 => ({
    headPos: { x: 0, y: 0 },
    tailPos: { x: 0, y: 0 },
    tailPosList: []
})

const initGame10 = (): Game10 => ({
    tailPos: range(0, 10).map(_ => ({ x: 0, y: 0 })),
    tailPosList: []
})

const moveHead = (headPos: Pos, cmd: string, line: number = -1) => {
    switch (cmd) {
        case "U":
            return { x: headPos.x, y: headPos.y - 1 }
        case "D":
            return { x: headPos.x, y: headPos.y + 1 }
        case "L":
            return { x: headPos.x - 1, y: headPos.y }
        case "R":
            return { x: headPos.x + 1, y: headPos.y }
        default:
            throw new Error(`wrong Command: ${ cmd } in line ${ line }`)
    }
}

export const moveTail = (headPos: Pos, tailPos: Pos, line: number = -1): Pos => {
    const ret = { x: tailPos.x, y: tailPos.y }
    const deltaPos = {
        x: headPos.x - tailPos.x,
        y: headPos.y - tailPos.y
    }
    if (Math.abs(deltaPos.x) < 2 && Math.abs(deltaPos.y) < 2)
        return ret

    if (Math.abs(deltaPos.x) === 2 && Math.abs(deltaPos.y) === 2) {
        ret.x = tailPos.x + (deltaPos.x / 2)
        ret.y = tailPos.y + (deltaPos.y / 2)
        return ret
    }

    if (Math.abs(deltaPos.x) === 2) {
        if (Math.abs(deltaPos.y) !== 0) {
            ret.y = headPos.y
        }
        ret.x = tailPos.x + (deltaPos.x / 2)
        return ret
    }

    if (Math.abs(deltaPos.y) === 2) {
        if (Math.abs(deltaPos.x) !== 0) {
            ret.x = headPos.x
        }
        ret.y = tailPos.y + (deltaPos.y / 2)
        return ret
    }

    throw new Error(`Game1 is in wrong state!: x: ${ deltaPos.x }, y: ${ deltaPos.y } in line: ${ line }`)
}

const doStep1 = (game: Game1, cmdLine: string, line: number) => {
    const [ cmd, amountString ] = cmdLine.split(" ")
    const amount = parseInt(amountString)
    for (let i = 0; i < amount; i++) {
        game.headPos = moveHead(game.headPos, cmd, line)
        game.tailPos = moveTail(game.headPos, game.tailPos, line)
        game.tailPosList.push(toPosItem(game.tailPos))
    }
}

const doStep10 = (game: Game10, cmdLine: string, line: number) => {
    const [ cmd, amountString ] = cmdLine.split(" ")
    const amount = parseInt(amountString)
    times(amount, _ => {
        game.tailPos[0] = moveHead(game.tailPos[0], cmd, line)
        for (let j = 1; j < 10; j++) {
            game.tailPos[j] = moveTail(game.tailPos[j - 1], game.tailPos[j], line)
        }
        game.tailPosList.push(toPosItem(game.tailPos[9]))
    })
}

export const day91 = (input: string[]) => {
    const game = initGame1()
    forEach.indexed(input, (cmdLine, line) => {
        doStep1(game, cmdLine, line)
    })
    const uniqPosList = uniq(game.tailPosList)
    return uniqPosList.length
}

export const day92 = (input: string[]) => {
    const game = initGame10()
    forEach.indexed(input, (cmdLine, line) => {
        doStep10(game, cmdLine, line)
    })
    const uniqPosList = uniq(game.tailPosList)
    return uniqPosList.length
}
