import { drop, find, findIndex, identity, map, pipe, splitAt, sumBy, take } from "remeda";

const deltaLowercase = "a".charCodeAt(0) - 1 //?
const deltaUppercase = "A".charCodeAt(0) - 27 //?

function findPackage(rucksack: string): string {
    const compartments = splitAt(rucksack.split(''), rucksack.length / 2)
    return find(compartments[0], item1 =>
        findIndex(compartments[1], item2 => item1 === item2) >= 0
    )!
}

const calculatePriority = (item: string) =>
    item <= 'Z'
        ? item.charCodeAt(0) - deltaUppercase
        : item.charCodeAt(0) - deltaLowercase

export const day31 = (input: string[]) =>
    pipe(
        input,
        map(findPackage),
        map(calculatePriority),
        sumBy(identity)
    )


const makeGroupsOfThree = (lines: string[]): string[][] => {
    const ret: string[][] = []
    while (lines.length > 0) {
        ret.push(take(lines, 3))
        lines = drop(lines, 3)
    }
    return ret
}

const findGroupPackage = (group: string[]): string =>
    find(group[0].split(''), item1 =>
        findIndex(group[1].split(''), item2 => item1 === item2) >= 0 &&
        findIndex(group[2].split(''), item3 => item1 === item3) >= 0
    )!

export const day32 = (input: string[]) =>
    pipe(
        input,
        makeGroupsOfThree,
        map(findGroupPackage),
        map(calculatePriority),
        sumBy(identity)
    )
