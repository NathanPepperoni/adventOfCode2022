import loadPuzzleInput from "../utils/loadPuzzleInput.js";

// function getFileSize(fileLine) {
//     return Number.parseInt(fileLine.replace(")", "").split("=")[1]);
// }

// function calculateDirSizes(fileInfo) {
//     const bundleSizes = [];
//     for (let i = 0; i < fileInfo.length; i++) {
//         const bundleLevel = i;
//         const bundleLineLevel = [...fileInfo[bundleLevel].split("-")[0].matchAll(" ")].length;

//         if (bundleLevel >= fileInfo.length - 1) {
//             return bundleSizes;
//         }

//         let nextLineLevel = [...fileInfo[bundleLevel + 1].split("-")[0].matchAll(" ")].length;

//         let nextLevel = bundleLevel + 1;
//         let bundleSize = 0;
//         while (nextLineLevel > bundleLineLevel && nextLevel < fileInfo.length) {
//             // console.log(`${fileInfo[bundleLevel]} has ${fileInfo[nextLevel]}`);
//             if (fileInfo[nextLevel].includes("file") && fileInfo[bundleLevel].includes("dir")) {
//                 bundleSize += getFileSize(fileInfo[nextLevel]);
//             }
//             nextLineLevel = [...fileInfo[++nextLevel].split("-")[0].matchAll(" ")].length;
//         }

//         if (bundleSize <= 100000) {
//             bundleSizes.push(bundleSize);
//         }
//     }
// }

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
