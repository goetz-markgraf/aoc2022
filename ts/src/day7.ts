import { filter, find, pipe, sortBy, sumBy } from "remeda";

type FilesystemItem = Directory | File

interface File {
    type: "file"
    name: string
    size: number
}

interface Directory {
    type: "dir"
    name: string
    parent?: Directory,
    size?: number,
    items: FilesystemItem[]
}


interface Lexer {
    text: string[]
    line: number
}

const next = (lexer: Lexer) => lexer.line++
const currLine = (lexer: Lexer) => lexer.line < lexer.text.length ? lexer.text[lexer.line] : ""
const isCmd = (lexer: Lexer) => currLine(lexer).startsWith("$ ")

const getSubdir = (dir: Directory, name: string): Directory => {
    const subDir = dir.items.find(item => item.name === name)

    if (subDir === undefined || subDir.type !== "dir")
        throw new Error(`no subdir ${ name } found in directory ${ dir.name }`)
    else
        return subDir
}


const fillContent = (dir: Directory, lexer: Lexer) => {
    next(lexer)
    while (!currLine(lexer).startsWith("$") && currLine(lexer) !== "") {
        const [ sizeType, name ] = currLine(lexer).split(" ")
        if (sizeType === "dir")
            dir.items.push({ type: "dir", name: name, parent: dir, items: [] })
        else
            dir.items.push({ type: "file", name: name, size: parseInt(sizeType) })

        next(lexer)
    }
    lexer.line--
}

const executeCmd = (line: string, dir: Directory, lexer: Lexer): Directory => {

    const [ cmd, param ] = line.split(" ")
    switch (cmd) {
        case "cd":
            if (param === ".." && dir.parent) {
                return dir.parent
            } else if (param === "..")
                throw new Error("Cannot access parent of root directory")
            else {
                return getSubdir(dir, param)
            }

        case "ls":
            fillContent(dir, lexer)
            return dir
    }
    return dir
}

const parseInput = (input: string[]): Directory => {
    const root: Directory = { type: "dir", name: "/", items: [] }
    let cwd = root
    const lexer = { text: input.slice(1), line: 0 }
    while (currLine(lexer) !== "" && isCmd(lexer)) {
        cwd = executeCmd(currLine(lexer).slice(2), cwd, lexer)
        next(lexer)
    }
    return root
}

const calculateSize = (dir: Directory) => {
    dir.items.forEach(item => {
        if (item.type === "dir" && !item.size)
            calculateSize(item)
    })
    dir.size = sumBy(dir.items, item => item.size!)
    return dir
}

const allDirItems = (dir: Directory): Directory[] => {
    const ret: Directory[] = []
    dir.items.forEach(item => {
            if (item.type === "dir") {
                const subDirs = allDirItems(item)
                ret.push(...subDirs)
            }
        }
    )
    ret.push(dir)
    return ret
}

export const day71 = (input: string[]) =>
    pipe(
        input,
        parseInput,
        calculateSize,
        allDirItems,
        filter(dir => dir.size! <= 100000),
        sumBy(dir => dir.size!)
    )

export const day72 = (input: string[]) => {
    const listOfDirectories = pipe(
        input,
        parseInput,
        calculateSize,
        allDirItems
    )
    const rootDir = pipe(
        listOfDirectories,
        find(dir => dir.name === "/"),
    )
    const maxSize = rootDir!.size!
    const sizeNeeded = maxSize - 40000000
    if (sizeNeeded < 0) return 0
    const fittingDirectory = pipe(
        listOfDirectories,
        filter(dir => dir.size! >= sizeNeeded),
        sortBy(dir => dir.size!)
    )[0]

    return fittingDirectory.size
}
