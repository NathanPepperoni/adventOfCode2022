import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function calculateRoundScore(opponent, you) {
    let score = 0;
    if (you === "X") {
        if (opponent == "A") {
            score += 3;
        } else if (opponent == "B") {
            score += 1;
        } else {
            score += 2;
        }
    } else if (you === "Y") {
        score += 3;
        if (opponent == "A") {
            score += 1;
        } else if (opponent == "B") {
            score += 2;
        } else {
            score += 3;
        }
    } else if (you === "Z") {
        score += 6;
        if (opponent == "A") {
            score += 2;
        } else if (opponent == "B") {
            score += 3;
        } else {
            score += 1;
        }
    }
    return score;
}

function star4() {
    const input = loadPuzzleInput(2).map((round) => round.split(" "));
    let totalScore = 0;
    input.forEach((round) => (totalScore += calculateRoundScore(round[0], round[1])));
    return totalScore;
}

export default star4;
