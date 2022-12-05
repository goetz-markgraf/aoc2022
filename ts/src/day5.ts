import { concat, drop, dropLast, map, range } from "remeda";

type Stacks = string[][]

const fillStacks = (input: string[]): [number, Stacks] => {
    const stacks: Stacks = []
    range(0,10).forEach(_ => stacks.push([]))

    let count = 0;
    let line= input[count]

    while (line.trim() !== "") {
        if (!line.startsWith(" 1")) {
            range(0, 10).forEach(pos => {
                if (line.length >= (pos + 1) * 4-1) {
                    const char = line[(pos) * 4 + 1]
                    if (char !== " ")
                        stacks[pos].push(char)
                }
            })
        }
        count ++
        line = input[count]
    }

    while (stacks[stacks.length-1].length === 0)
        stacks.pop()

    return [count, stacks]
}

const doCmds9000 = (stacks: Stacks) => (cmd: string) => {
    const lex = cmd.split(" ")
    const amount = parseInt(lex[1])
    const from = parseInt(lex[3])-1
    const to = parseInt(lex[5])-1

    range(0, amount).forEach(_ => {
        const item = stacks[from].shift()
        stacks[to].unshift(item!)
    })
}

const doCmds9001 = (stacks: Stacks) => (cmd: string) => {
    const lex = cmd.split(" ")
    const amount = parseInt(lex[1])
    const from = parseInt(lex[3])-1
    const to = parseInt(lex[5])-1

    const pack = dropLast(stacks[from], (stacks[from].length)-amount)
    stacks[from] = drop(stacks[from], amount)
    stacks[to] = concat(pack, stacks[to])
}

const getResult = (stacks: Stacks) =>
    stacks.map(stack => stack[0]).join("")

export const day51 = (input: string[]) => {
    const [count, stacks] = fillStacks(input)
    const cmds = drop(input, count+1)
    map(cmds, doCmds9000(stacks))
    return getResult(stacks)
}

export const day52 = (input: string[]) => {
    const [count, stacks] = fillStacks(input) //?
    const cmds = drop(input, count+1) //?
    map(cmds, doCmds9001(stacks))
    return getResult(stacks)
}
