import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function evaluatePair(left, right) {
    if (left !== undefined && right === undefined) {
        return -1;
    }
    if (Array.isArray(left) && !Array.isArray(right)) {
        return evaluatePair(left, [right]);
    }
    if (!Array.isArray(left) && Array.isArray(right)) {
        return evaluatePair([left], right);
    }
    if (Array.isArray(left) && Array.isArray(right)) {
        if (left.length === 0) {
            return right.length;
        }
        for (let i = 0; i < left.length; i++) {
            const pairValue = evaluatePair(left[i], right[i]);
            if (pairValue === 0 || pairValue === undefined) {
                if (left.length < right.length && i + 1 >= right.length - 1) {
                    return 1;
                }
            } else {
                return pairValue;
            }
        }
        return;
    }
    return right - left;
}

function star25() {
    const pairs = loadPuzzleInput(13, "\n\n").map((pair) => [
        JSON.parse(pair.split("\n")[0]),
        JSON.parse(pair.split("\n")[1]),
    ]);

    let sum = 0;
    let index = 1;
    pairs.forEach((pair) => {
        const isInRightOrder = evaluatePair(pair[0], pair[1]);
        if (isInRightOrder > 0) {
            sum += index;
        }
        index++;
    });

    return sum;
}

export default star25;
