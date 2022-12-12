import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function findTargetAndStart(input) {
    let target;
    let start;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] === "E") {
                target = [i, j];
                input[i] = input[i].replace("E", "z");
            }
            if (input[i][j] === "S") {
                start = [i, j];
                input[i] = input[i].replace("S", "a");
            }
            if (target && start) {
                return [target, start];
            }
        }
    }
}

// branch has total, and a position
function incrementBranch(input, branch, traveled) {
    const newBranches = [];
    const currentPosition = JSON.parse(branch.position);
    const currentValue = input[currentPosition[0]][currentPosition[1]];
    const maxElev = currentValue.charCodeAt(0) + 1;

    // north
    if (currentPosition[0] > 0 && input[currentPosition[0] - 1][currentPosition[1]].charCodeAt(0) <= maxElev) {
        const newPosition = JSON.stringify([currentPosition[0] - 1, currentPosition[1]]);
        newBranches.push({
            total: branch.total + 1,
            position: newPosition,
        });
    }

    // east
    if (
        currentPosition[1] < input[0].length - 1 &&
        input[currentPosition[0]][currentPosition[1] + 1].charCodeAt(0) <= maxElev
    ) {
        newBranches.push({
            total: branch.total + 1,
            position: JSON.stringify([currentPosition[0], currentPosition[1] + 1]),
        });
    }

    // south
    if (
        currentPosition[0] < input.length - 1 &&
        input[currentPosition[0] + 1][currentPosition[1]].charCodeAt(0) <= maxElev
    ) {
        newBranches.push({
            total: branch.total + 1,
            position: JSON.stringify([currentPosition[0] + 1, currentPosition[1]]),
        });
    }

    // west
    if (currentPosition[1] > 0 && input[currentPosition[0]][currentPosition[1] - 1].charCodeAt(0) <= maxElev) {
        newBranches.push({
            total: branch.total + 1,
            position: JSON.stringify([currentPosition[0], currentPosition[1] - 1]),
        });
    }

    return newBranches.filter((branch) => !traveled.includes(branch.position));
}

function star23() {
    const input = loadPuzzleInput(12).filter((line) => line.length > 0);
    const targetAndStart = findTargetAndStart(input);
    const target = JSON.stringify(targetAndStart[0]);
    const start = JSON.stringify(targetAndStart[1]);

    const traveled = [start];
    let branches = [{ total: 0, position: start }];

    while (true) {
        branches.sort((a, b) => a.total - b.total); // ideally this would be a heap
        const shortestBranch = branches[0];
        const newBranches = incrementBranch(input, shortestBranch, traveled);
        for (let i = 0; i < newBranches.length; i++) {
            if (newBranches[i].position === target) {
                return newBranches[i].total;
            }
            traveled.push(newBranches[i].position);
        }
        branches = branches.slice(1).concat(newBranches);
    }
}

export default star23;
