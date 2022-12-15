import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function findGridSize(input) {
    const minY = 0;
    let maxY = Number.MIN_SAFE_INTEGER;
    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    input.forEach((line) => {
        line.split(" -> ").forEach((coord) => {
            minX = Math.min(minX, Number.parseInt(coord.split(",")[0]));
            maxX = Math.max(maxX, Number.parseInt(coord.split(",")[0]));
            maxY = Math.max(maxY, Number.parseInt(coord.split(",")[1]));
        });
    });

    return { minX, maxX, minY, maxY };
}

function printGrid(grid) {
    console.clear();
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length - 1; j++) {
            process.stdout.write(grid[i][j]);
        }
        process.stdout.write("\n");
    }
}

function createGrid(minX, maxX, minY, maxY) {
    const grid = [];
    let originX = 0;
    for (let i = minY; i <= maxY; i++) {
        const gridLine = [];
        for (let j = minX; j <= maxX; j++) {
            if (i === 0 && j === 500) {
                gridLine.push("+");
                originX = j - minX;
            }
            gridLine.push(".");
        }
        grid.push(gridLine);
    }

    return { grid, originX };
}

function populateRocks(input, grid, minX) {
    input.forEach((rockLine) => {
        const coordinates = rockLine.split(" -> ").map((coord) => {
            const split = coord.split(",");
            const x = Number.parseInt(split[0]) - minX;
            const y = Number.parseInt(split[1]);
            return [x, y];
        });

        for (let i = 0; i < coordinates.length - 1; i++) {
            const isHorizontal = coordinates[i][0] !== coordinates[i + 1][0];
            const axis = isHorizontal ? 0 : 1;
            const isDescending = coordinates[i][axis] < coordinates[i + 1][axis];
            const modifier = isDescending ? 1 : -1;
            while (coordinates[i][axis] !== coordinates[i + 1][axis]) {
                grid[coordinates[i][1]][coordinates[i][0]] = "#";
                grid[coordinates[i + 1][1]][coordinates[i + 1][0]] = "#";
                coordinates[i][axis] = coordinates[i][axis] + modifier;
            }
        }
    });
}

function dropSand(grid, sandX, sandY) {
    if (sandX === -1 || sandX > grid[0].length - 1 || sandY === grid.length - 1) {
        return undefined;
    }

    const tileBelow = grid[sandY + 1][sandX];

    if (tileBelow === ".") {
        return dropSand(grid, sandX, sandY + 1);
    }

    const tileBelowLeft = grid[sandY + 1][sandX - 1];
    if (tileBelowLeft === ".") {
        return dropSand(grid, sandX - 1, sandY + 1);
    }

    const tileBelowRight = grid[sandY + 1][sandX + 1];
    if (tileBelowRight === ".") {
        return dropSand(grid, sandX + 1, sandY + 1);
    }

    if (tileBelow === undefined || tileBelowLeft === undefined || tileBelowRight === undefined) {
        return undefined;
    }

    grid[sandY][sandX] = "o";
    return { sandX, sandY };
}

function star27() {
    const input = loadPuzzleInput(14).filter((line) => line.length > 0);
    const { minX, maxX, minY, maxY } = findGridSize(input);
    const { grid, originX } = createGrid(minX, maxX, minY, maxY);
    populateRocks(input, grid, minX);
    let lastSandResting = { sandX: originX, sandY: 0 };
    let sandCount = -1;
    while (lastSandResting !== undefined) {
        lastSandResting = dropSand(grid, originX, 1);
        sandCount++;
    }

    return sandCount;
}

export default star27;
