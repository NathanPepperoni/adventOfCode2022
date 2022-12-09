import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function moveHead(headPos, direction) {
    if (direction === "R") {
        return [headPos[0], headPos[1] + 1];
    }
    if (direction === "D") {
        return [headPos[0] - 1, headPos[1]];
    }
    if (direction === "L") {
        return [headPos[0], headPos[1] - 1];
    }
    if (direction === "U") {
        return [headPos[0] + 1, headPos[1]];
    }

    return headPos;
}

function straightSnap(tailPos, headPos) {
    if (tailPos[0] === headPos[0]) {
        if (tailPos[1] < headPos[1]) {
            return [tailPos[0], tailPos[1] + 1];
        } else {
            return [tailPos[0], tailPos[1] - 1];
        }
    } else {
        if (tailPos[0] < headPos[0]) {
            return [tailPos[0] + 1, tailPos[1]];
        } else {
            return [tailPos[0] - 1, tailPos[1]];
        }
    }
}

function diagSnap(tailPos, headPos) {
    if (tailPos[0] < headPos[0]) {
        if (tailPos[1] < headPos[1]) {
            return [tailPos[0] + 1, tailPos[1] + 1];
        } else {
            return [tailPos[0] + 1, tailPos[1] - 1];
        }
    } else {
        if (tailPos[1] < headPos[1]) {
            return [tailPos[0] - 1, tailPos[1] + 1];
        } else {
            return [tailPos[0] - 1, tailPos[1] - 1];
        }
    }
}

function snapToHead(tailPos, headPos) {
    if (JSON.stringify(tailPos) === JSON.stringify(headPos)) {
        return tailPos;
    }

    if (Math.abs(tailPos[0] - headPos[0]) < 2 && Math.abs(tailPos[1] - headPos[1]) < 2) {
        return tailPos;
    }

    if (tailPos[0] === headPos[0] || tailPos[1] === headPos[1]) {
        return straightSnap(tailPos, headPos);
    } else {
        return diagSnap(tailPos, headPos);
    }
}

function star18() {
    const input = loadPuzzleInput(9).filter((move) => move.length > 0);

    const snake = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ];

    const tailLocationSet = new Set();

    input.forEach((move) => {
        const direction = move.split(" ")[0];
        const count = Number.parseInt(move.split(" ")[1]);

        for (let i = 0; i < count; i++) {
            snake[0] = moveHead(snake[0], direction);
            for (let ropePiece = 1; ropePiece < 10; ropePiece++) {
                snake[ropePiece] = snapToHead(snake[ropePiece], snake[ropePiece - 1]);
            }
            const tailPos = snake[9];
            tailLocationSet.add(JSON.stringify(tailPos));
        }
    });

    return tailLocationSet.size;
}

export default star18;
