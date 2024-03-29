import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function walkDirs(input) {
    const dirSizes = { "/": 0 };
    let dirStack = [];

    input.forEach((line) => {
        if (line.slice(0, 4) === "$ cd") {
            if (line === "$ cd ..") {
                dirStack.pop();
            } else if (line === "$ cd /") {
                dirStack = ["/"];
            } else {
                const dirName = JSON.stringify(dirStack) + line.replace("$ cd ", "");
                dirStack.push(dirName);
                if (!dirSizes[dirName]) {
                    dirSizes[dirName] = 0;
                }
            }
        } else if (line.slice(0, 3) !== "dir" && line[0] !== "$") {
            const fileSize = Number.parseInt(line.split(" ")[0]);
            if (!Number.isNaN(fileSize)) {
                dirStack.forEach((dir) => {
                    dirSizes[dir] = dirSizes[dir] + fileSize;
                });
            }
        }
    });

    return dirSizes;
}

function star13() {
    const input = loadPuzzleInput(7);
    const dirSizes = walkDirs(input);
    let sum = 0;
    Object.keys(dirSizes).forEach((dir) => {
        if (dirSizes[dir] <= 100000) {
            sum += dirSizes[dir];
        }
    });

    return sum;
}

export default star13;
