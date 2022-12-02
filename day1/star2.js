import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star2() {
    const input = loadPuzzleInput(1);

    let maxes = [];
    let counter = 0;

    input.forEach((line) => {
        if (line === "") {
            if (maxes.length < 3) {
                maxes.push(counter);
                maxes.sort((a, b) => a - b);
            } else {
                if (counter > maxes[0]) {
                    maxes[0] = counter;
                    maxes.sort((a, b) => a - b);
                }
            }
            counter = 0;
        } else {
            counter += Number.parseInt(line);
        }
    });

    return maxes.reduce((acc, cur) => acc + cur, 0);
}

export default star2;
