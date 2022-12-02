import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star1() {
    const input = loadPuzzleInput(1);

    let max = 0;
    let counter = 0;

    input.forEach((line) => {
        if (line === "") {
            counter = 0;
        } else {
            counter += Number.parseInt(line);
            max = Math.max(counter, max);
        }
    });

    return max;
}

export default star1;
