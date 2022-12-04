import * as fs from "fs";

export const readText = (filename: string) => {
    const pathName = "../input/" + filename

    const content = fs.readFileSync(pathName).toString("utf-8")
    const lines = content.split("\n")

    if (lines[lines.length - 1].trim() === "")
        return lines.slice(0, lines.length - 1)
    else return lines
}

export const add = (a: number, b: number) => a + b

export const sortDesc = (a: number, b: number) => b - a

export const length = (arr: any[]) => arr.length
