import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function evaluateSignal(left, right) {
    if (left !== undefined && right === undefined) {
        return -1;
    }
    if (Array.isArray(left) && !Array.isArray(right)) {
        return evaluateSignal(left, [right]);
    }
    if (!Array.isArray(left) && Array.isArray(right)) {
        return evaluateSignal([left], right);
    }
    if (Array.isArray(left) && Array.isArray(right)) {
        if (left.length === 0) {
            return right.length;
        }
        for (let i = 0; i < left.length; i++) {
            const pairValue = evaluateSignal(left[i], right[i]);
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

function star26() {
    let signal = loadPuzzleInput(13, "\n")
        .filter((line) => line.length > 0)
        .map((line) => JSON.parse(line));

    const divider1 = [[2]];
    const divider2 = [[6]];
    signal = signal.concat([divider1, divider2]);

    signal.sort(evaluateSignal).reverse();

    return (signal.indexOf(divider1) + 1) * (signal.indexOf(divider2) + 1);
}

export default star26;
