import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function calculateRoundScore(opponent, you) {
    let score = 0;
    if (you === "X") {
        score += 1;
        if (opponent == "A") {
            score += 3;
        } else if (opponent == "C") {
            score += 6;
        }
    } else if (you === "Y") {
        score += 2;
        if (opponent == "B") {
            score += 3;
        } else if (opponent == "A") {
            score += 6;
        }
    } else if (you === "Z") {
        score += 3;
        if (opponent == "C") {
            score += 3;
        } else if (opponent == "B") {
            score += 6;
        }
    }
    return score;
}

function star3() {
    const input = loadPuzzleInput(2).map((round) => round.split(" "));
    let totalScore = 0;
    input.forEach((round) => (totalScore += calculateRoundScore(round[0], round[1])));
    return totalScore;
}

export default star3;
