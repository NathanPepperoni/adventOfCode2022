import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function getCrateCount(crateConfigLine) {
    return crateConfigLine.split("  ").length;
}

function stackFromConfig(crateConfig) {
    const parsedConfig = crateConfig
        .slice(1)
        .map((row) => row.replaceAll("    ", " [] ").replaceAll(" ", "").replaceAll("][", "] ["));

    const crateStack = [];
    for (let i = 0; i < getCrateCount(crateConfig[0]); i++) {
        crateStack.push([]);
    }

    parsedConfig.forEach((row) => {
        row = row.split(" ").filter((crate) => crate.length > 0);
        for (let i = 0; i < row.length; i++) {
            if (row[i] !== "[]") {
                crateStack[i].push(row[i].replace("[", "").replace("]", ""));
            }
        }
    });
    return crateStack;
}

function createMoves(moveConfig) {
    const moveArray = moveConfig.map((move) =>
        move.replace("move ", "").replace(" from", "").replace(" to", "").split(" ")
    );
    const moves = [];
    moveArray.forEach((move) => {
        moves.push({
            count: Number.parseInt(move[0]),
            target: Number.parseInt(move[1] - 1),
            dest: Number.parseInt(move[2] - 1),
        });
    });

    return moves;
}

function executeMove(move, stack) {
    for (let i = 0; i < move.count; i++) {
        stack[move.dest].push(stack[move.target].pop());
    }
}

function star9() {
    const input = loadPuzzleInput(5);
    const crateConfig = input.slice(0, input.indexOf("")).reverse();
    const crateMoveConfig = input.slice(input.indexOf("")).filter((move) => move.length > 0);
    const stack = stackFromConfig(crateConfig);
    const moves = createMoves(crateMoveConfig);
    moves.forEach((move) => {
        executeMove(move, stack);
    });

    let outputString = "";
    stack.forEach((col) => {
        outputString += col[col.length - 1];
    });

    return outputString;
}

export default star9;
