import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star12() {
    const bufferStream = loadPuzzleInput(6)[0];
    const windowSize = 14;
    for (let i = 0; i < bufferStream.length - windowSize; i++) {
        const currentWindow = bufferStream.slice(i, i + windowSize).split("");
        const currentWindowSet = new Set(currentWindow);
        const hasDuplicates = currentWindowSet.size < windowSize;
        if (!hasDuplicates) {
            return i + windowSize;
        }
    }
}

export default star12;
