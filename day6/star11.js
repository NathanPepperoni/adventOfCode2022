import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star11() {
    const bufferStream = loadPuzzleInput(6)[0];
    const windowSize = 4;
    for (let i = 0; i < bufferStream.length - windowSize; i++) {
        const currentWindow = bufferStream.slice(i, i + windowSize).split("");
        const currentWindowSet = new Set(currentWindow);
        const hasDuplicates = currentWindowSet.size < windowSize;
        if (!hasDuplicates) {
            return i + windowSize;
        }
    }
}

export default star11;
