const scorePart1 = (game: string): number => {
    let ret = -1
    switch (game) {
        case "A X":
            ret = 1 + 3
            break
        case "A Y":
            ret = 2 + 6
            break
        case "A Z":
            ret = 3 + 0
            break
        case "B X":
            ret = 1 + 0
            break
        case "B Y":
            ret = 2 + 3
            break
        case "B Z":
            ret = 3 + 6
            break
        case "C X":
            ret = 1 + 6
            break
        case "C Y":
            ret = 2 + 0
            break
        case "C Z":
            ret = 3 + 3
            break
    }

    if (ret === -1)
        throw new Error("Wrong input")

    return ret
}

const scorePart2 = (game: string): number => {
    let ret = -1
    switch (game) {
        case "A X":
            ret = 3 + 0
            break
        case "A Y":
            ret = 1 + 3
            break
        case "A Z":
            ret = 2 + 6
            break
        case "B X":
            ret = 1 + 0
            break
        case "B Y":
            ret = 2 + 3
            break
        case "B Z":
            ret = 3 + 6
            break
        case "C X":
            ret = 2 + 0
            break
        case "C Y":
            ret = 3 + 3
            break
        case "C Z":
            ret = 1 + 6
            break
    }

    if (ret === -1)
        throw new Error("Wrong input")

    return ret
}

const add = (a: number, b: number) => a + b

export const day21 = (input: string[]) =>
    input
        .map(scorePart1)
        .reduce(add, 0)

export const day22 = (input: string[]) =>
    input
        .map(scorePart2)
        .reduce(add, 0)
