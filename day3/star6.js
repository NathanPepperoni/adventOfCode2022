import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const priority = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getPriorityForChar(character) {
    return priority.indexOf(character) + 1;
}

function star6() {
    const ruckSacks = loadPuzzleInput(3);

    const elfGroups = [];

    for (let i = 0; i < ruckSacks.length; i += 3) {
        elfGroups.push([ruckSacks[i], ruckSacks[i + 1], ruckSacks[i + 2]]);
    }

    let prioritySum = 0;
    elfGroups.forEach((group) => {
        let dupes = group[0].split("");
        for (let i = 0; i < group[0].length; i++) {
            dupes = dupes.filter((item) => group[1].includes(item));
            dupes = dupes.filter((item) => group[2].includes(item));
        }

        prioritySum += getPriorityForChar(dupes[0]);
    });

    return prioritySum;
}

export default star6;
