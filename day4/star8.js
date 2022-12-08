import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function doesOverlap(pairing) {
    const firstElf = pairing[0];
    const secondElf = pairing[1];

    const firstElfStart = firstElf[0];
    const firstElfStop = firstElf[1];
    const secondElfStart = secondElf[0];
    const secondElfStop = secondElf[1];

    // [ [ 56, 60 ], [ 55, 55 ] ]

    if (
        [secondElfStart, secondElfStop].includes(firstElfStart) ||
        [secondElfStart, secondElfStop].includes(firstElfStop)
    ) {
        return true;
    }

    if (firstElfStart < secondElfStart) {
        if (firstElfStop > secondElfStart) {
            return true;
        }
    }
    if (firstElfStart > secondElfStart) {
        if (secondElfStop > firstElfStart) {
            return true;
        }
    }
    return false;
}
function star8() {
    const input = loadPuzzleInput(4)
        .map((pairing) =>
            pairing.split(",").map((range) => {
                const rangeSplit = range.split("-");
                return [Number.parseInt(rangeSplit[0]), Number.parseInt(rangeSplit[1])];
            })
        )
        .filter((item) => item.length > 1);

    let count = 0;
    input.forEach((pairing) => {
        if (doesOverlap(pairing)) {
            count++;
        }
    });

    return count;
}

export default star8;
