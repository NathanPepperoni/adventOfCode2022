import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function getGridDimensions(input) {
    let maxX = 0;
    let maxY = 0;
    let maxZ = 0;

    input.forEach((cube) => {
        const cubeCoordinates = cube.split(",");
        const cubeX = cubeCoordinates[0];
        const cubeY = cubeCoordinates[1];
        const cubeZ = cubeCoordinates[2];

        maxX = Math.max(maxX, cubeX);
        maxY = Math.max(maxY, cubeY);
        maxZ = Math.max(maxZ, cubeZ);
    });

    return { maxX, maxY, maxZ };
}

function mapZSides(grid) {
    let total = 0;
    for (let z = 0; z < grid[0][0].length; z++) {
        for (let y = 0; y < grid[0].length; y++) {
            for (let x = 0; x < grid.length; x++) {
                const prevVal = grid[x][y][z];
                grid[x][y][z] = "?";
                if (prevVal === "#") {
                    grid[x][y][z] = prevVal;
                    total++;
                    break;
                }
                grid[x][y][z] = prevVal;
            }
        }
    }
    for (let z = grid[0][0].length; z >= 0; z--) {
        for (let y = 0; y < grid[0].length; y++) {
            for (let x = 0; x < grid.length; x++) {
                const prevVal = grid[x][y][z];
                grid[x][y][z] = "?";
                if (prevVal === "#") {
                    grid[x][y][z] = prevVal;
                    total++;
                    break;
                }
                grid[x][y][z] = prevVal;
            }
        }
    }
    return total;
}

function mapYSides(grid) {
    let total = 0;
    for (let y = 0; y < grid[0].length; y++) {
        for (let z = 0; z < grid[0][0].length; z++) {
            for (let x = 0; x < grid.length; x++) {
                const prevVal = grid[x][y][z];
                grid[x][y][z] = "?";
                if (prevVal === "#") {
                    grid[x][y][z] = prevVal;
                    total++;
                    break;
                }
                grid[x][y][z] = prevVal;
            }
        }
    }
    for (let y = grid[0].length - 1; y >= 0; y--) {
        for (let z = 0; z < grid[0][0].length; z++) {
            for (let x = 0; x < grid.length; x++) {
                const prevVal = grid[x][y][z];
                grid[x][y][z] = "?";
                if (prevVal === "#") {
                    grid[x][y][z] = prevVal;
                    total++;
                    break;
                }
                grid[x][y][z] = prevVal;
            }
        }
    }
    return total;
}

function mapXSides(grid) {
    let total = 0;
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            for (let z = 0; z < grid[0][0].length; z++) {
                const prevVal = grid[x][y][z];
                grid[x][y][z] = "?";
                if (prevVal === "#") {
                    grid[x][y][z] = prevVal;
                    total++;
                    break;
                }
                grid[x][y][z] = prevVal;
            }
        }
    }
    for (let x = grid.length - 1; x >= 0; x--) {
        for (let y = 0; y < grid[0].length; y++) {
            for (let z = 0; z < grid[0][0].length; z++) {
                const prevVal = grid[x][y][z];
                grid[x][y][z] = "?";
                if (prevVal === "#") {
                    grid[x][y][z] = prevVal;
                    total++;
                    break;
                }
                grid[x][y][z] = prevVal;
            }
        }
    }
    return total;
}

function star36() {
    const input = loadPuzzleInput(18).filter((line) => line.length > 0);

    const { maxX, maxY, maxZ } = getGridDimensions(input);

    const grid = [];

    for (let x = 0; x < maxX + 2; x++) {
        const xRow = [];
        for (let y = 0; y < maxY + 2; y++) {
            const yRow = [];
            for (let z = 0; z < maxZ + 2; z++) {
                yRow.push(".");
            }
            xRow.push(yRow);
        }
        grid.push(xRow);
    }

    input.forEach((cube) => {
        const cubeCoordinates = cube.split(",");
        const cubeX = cubeCoordinates[0];
        const cubeY = cubeCoordinates[1];
        const cubeZ = cubeCoordinates[2];

        grid[cubeX][cubeY][cubeZ] = "#";
    });

    // const z = mapZSides(grid);
    const y = mapYSides(grid);
    // const x = mapXSides(grid);

    return x + y + z;
}

export default star36;
