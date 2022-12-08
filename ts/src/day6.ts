import { findIndex, groupBy, identity, keys, pipe } from "remeda";

const isMarker = (chars: string, amount: number) =>
    pipe(
        chars.split(""),
        groupBy(identity),
        keys
    ).length >= amount


const findMarkerPosition2 = (input: string, amount: number) =>
    findIndex.indexed(
        input.split(""),
        (_, pos) =>
            pos < amount ? false : isMarker(input.slice(pos - amount, pos), amount)
    )


const findMarkerPosition = (input: string, amount: number) => {
    let ret = -1
    let pos = amount - 1
    while (pos < input.length && ret < 0) {
        if (isMarker(input.slice(pos - amount + 1, pos + 1), amount)) {
            ret = pos
        }
        pos++
    }

    return pos
}

export const day61 = (input: string) =>
    findMarkerPosition(input, 4)

export const day62 = (input: string) =>
    findMarkerPosition2(input, 14)
