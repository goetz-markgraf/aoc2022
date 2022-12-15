import * as fs from "fs";

export const readLines = (filename: string): string[] => {
    const content = readText(filename)
    const lines = content.split("\n")

    if (lines[lines.length - 1].trim() === "")
        return lines.slice(0, lines.length - 1)
    else return lines
}

export const readText = (filename: string): string => {
    const pathName = "../input_hidden/" + filename

    return fs.readFileSync(pathName).toString("utf-8")

}

export const add = (a: number, b: number) => a + b

export const sortDesc = (a: number, b: number) => b - a

export const length = (arr: any[]) => arr.length
