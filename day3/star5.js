import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getPriorityForChar(character) {
    return priority.indexOf(character) + 1;
}

function star5() {
    const ruckSacks = loadPuzzleInput(3).map((ruckSack) => [
        ruckSack.slice(0, ruckSack.length / 2),
        ruckSack.slice(ruckSack.length / 2),
    ]);

    const dupes = [];
    ruckSacks.forEach((ruckSack) => {
        let found = false;
        ruckSack[0].split("").forEach((item) => {
            if (ruckSack[1].includes(item) && !found) {
                dupes.push(item);
                found = true;
            }
        });
    });

    let prioritySum = 0;
    dupes.forEach((dupe) => (prioritySum += getPriorityForChar(dupe)));

    return prioritySum;
}

export default star5;
