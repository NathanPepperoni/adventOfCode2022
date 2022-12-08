import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function isAnEdge(input, row, col) {
    const width = input[0].length;
    const height = input.length;

    if (row === 0 || col === 0) {
        return true;
    }
    if (row === width - 1 || col === height - 1) {
        return true;
    }
}

function getScenicScore(input, row, col) {
    const width = input[0].length;
    const height = input.length;

    const currentTreeHeight = Number.parseInt(input[row][col]);

    let treesNorth = 0;
    let treesEast = 0;
    let treesSouth = 0;
    let treesWest = 0;

    for (let i = row - 1; i >= 0; i--) {
        treesNorth++;
        if (Number.parseInt(input[i][col]) >= currentTreeHeight) {
            break;
        }
    }
    for (let i = col + 1; i < width; i++) {
        treesEast++;
        if (Number.parseInt(input[row][i]) >= currentTreeHeight) {
            break;
        }
    }
    for (let i = row + 1; i < height; i++) {
        treesSouth++;
        if (Number.parseInt(input[i][col]) >= currentTreeHeight) {
            break;
        }
    }
    for (let i = col - 1; i >= 0; i--) {
        treesWest++;
        if (Number.parseInt(input[row][i]) >= currentTreeHeight) {
            break;
        }
    }

    return treesNorth * treesEast * treesSouth * treesWest;
}

function star16() {
    const input = loadPuzzleInput(8).filter((row) => row.length > 1);

    let maxScore = 0;
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[0].length; col++) {
            maxScore = Math.max(maxScore, getScenicScore(input, row, col));
        }
    }
    return maxScore;
}

export default star16;
