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

function isVisible(input, row, col) {
    const width = input[0].length;
    const height = input.length;

    if (isAnEdge(input, row, col)) {
        return true;
    }

    const currentTreeHeight = Number.parseInt(input[row][col]);

    let visibleNorth = true;
    let visibleEast = true;
    let visibleSouth = true;
    let visibleWest = true;

    for (let i = row - 1; i >= 0; i--) {
        if (Number.parseInt(input[i][col]) >= currentTreeHeight) {
            visibleNorth = false;
        }
    }
    for (let i = col + 1; i < width; i++) {
        if (Number.parseInt(input[row][i]) >= currentTreeHeight) {
            visibleEast = false;
        }
    }
    for (let i = row + 1; i < height; i++) {
        if (Number.parseInt(input[i][col]) >= currentTreeHeight) {
            visibleSouth = false;
        }
    }
    for (let i = col - 1; i >= 0; i--) {
        if (Number.parseInt(input[row][i]) >= currentTreeHeight) {
            visibleWest = false;
        }
    }

    return visibleNorth || visibleEast || visibleSouth || visibleWest;
}

function star15() {
    const input = loadPuzzleInput(8).filter((row) => row.length > 1);

    let visibleCount = 0;
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[0].length; col++) {
            if (isVisible(input, row, col)) {
                visibleCount++;
            }
        }
    }
    return visibleCount;
}

export default star15;
