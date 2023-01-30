import loadPuzzleInput from "../utils/loadPuzzleInput.js";
import printGrid from "../utils/printGrid.js";

const rock1 = ["|.......|".split(""), "|.......|".split(""), "|..@@@@.|".split("")].reverse();
const rock2 = ["|...@...|".split(""), "|..@@@..|".split(""), "|...@...|".split("")].reverse();
const rock3 = ["|....@..|".split(""), "|....@..|".split(""), "|..@@@..|".split("")].reverse();
const rock4 = ["|..@....|".split(""), "|..@....|".split(""), "|..@....|".split("")].reverse();

const rocks = [rock1, rock2, rock3, rock4];
let rockIndex = 0;
let windCurrents = [];
let windCurrentIndex = 0;

function spawnRock(grid) {
    const rock = rocks[rockIndex++ % rocks.length];
    grid.unshift("|.......|".split(""));
    grid.unshift("|.......|".split(""));
    grid.unshift("|.......|".split(""));

    rock.forEach((row) => {
        grid.unshift(row);
    });
}

function processRockWind(grid) {
    const direction = windCurrents[windCurrentIndex++ % windCurrents.length];
    let mod = direction === "<" ? -1 : 1;

    for (let i = 0; i < 3; i++) {
        for (let j = 1; j < grid[0].length - 1; j++) {
            const currentValue = grid[i][j];
            const adjacentValue = grid[i][j + mod];

            if (currentValue === "@" && ["#", "|"].includes(adjacentValue)) {
                return;
            }
        }
    }

    for (let i = 2; i >= 0; i--) {
        if (direction === "<") {
            grid[i] = grid[i].join("").replace("|.", "|").replace(".|", "..|").replace("@|", "@.|").split("");
        } else {
            grid[i] = grid[i].join("").replace("|.", "|..").replace("|@", "|.@").replace(".|", "|").split("");
        }
    }
}

function processRockFall(grid) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const currentValue = grid[i][j];
            const valueBelow = grid[i + 1][j];

            if (currentValue === "@" && ["#", "-"].includes(valueBelow)) {
                return true;
            }
        }
    }
    for (let i = 3; i > 0; i--) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] !== "#") {
                grid[i][j] = grid[i - 1][j];
            }
        }
    }
    grid.shift();
}

function solidifyRocks(grid) {
    for (let i = 0; i < grid.length - 1; i++) {
        grid[i] = grid[i].join("").replaceAll("@", "#").split("");
    }
}

function trimGrid(grid) {
    let numberToTrim = 0;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].join("") === "|.......|") {
            numberToTrim++;
        }
    }
    while (numberToTrim > 0) {
        grid.shift();
        numberToTrim--;
    }
}

function dropRock(grid) {
    spawnRock(grid);
    let settled = false;
    while (!settled) {
        processRockWind(grid);
        settled = processRockFall(grid);
    }
    solidifyRocks(grid);
    trimGrid(grid);
}

function star33() {
    const input = loadPuzzleInput(17)[0].split("");
    windCurrents = input;

    const grid = ["+-------+".split("")];

    let rockCount = 0;
    while (rockCount < 2022) {
        dropRock(grid, rock1);
        rockCount++;
    }

    return grid.length;
}

export default star33;
