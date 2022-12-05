import starray from "./utils/starray.js";
import { execSync } from "child_process";
import fs from "fs";

const createStarTemplate = (starNumber, dayNumber) => {
    return `import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function star${starNumber}() {
    const input = loadPuzzleInput(${dayNumber});
}

export default star${starNumber};
`;
};

const invalidArguments = () => {
    console.log("Invalid argument. Please read the README.");
};

const execute = () => {
    const args = process.argv;
    const cliArg = args[2].toLowerCase();
    const argNumber = Number.parseInt(cliArg.replace("star", "").replace("day", "").replace("generatestar", ""));
    if (cliArg.startsWith("generatestar")) {
        return generateStar();
    }
    if (!argNumber || Number.isNaN(argNumber)) {
        invalidArguments();
        return;
    }
    if (cliArg.startsWith("star")) {
        solveStar(argNumber);
    } else if (cliArg.startsWith("day")) {
        solveDay(argNumber);
    } else {
        invalidArguments();
        return;
    }
};

const solveStar = (starNumber) => {
    if (starNumber > starray.length) {
        console.log("requested star number not implemented yet.");
        return;
    }
    const result = starray[starNumber - 1]();

    if (result) {
        console.log(`star ${starNumber} result: ${result}`);
    }
};

const solveDay = (dayNumber) => {
    if (dayNumber > starray.length / 2) {
        console.log("requested star number not implemented yet.");
        return;
    }
    const firstStarNumber = 1 + 2 * (dayNumber - 1);
    const secondStarNumber = 2 + 2 * (dayNumber - 1);
    const firstResult = starray[firstStarNumber - 1]();
    const secondResult = starray[secondStarNumber - 1]();

    console.log(`Day ${dayNumber} results...`);
    console.log(`first star: ${firstResult}`);
    console.log(`second star: ${secondResult}`);
};

const getCurrentStarCount = () => {
    return starray.length;
};

const getDayForStar = (star) => {
    return Math.ceil(star / 2);
};

const updateStarray = (star, day) => {
    const starrayPath = "./utils/starray.js";
    const existingStarray = fs.readFileSync(starrayPath).toString();
    const dayForPreviousStar = getDayForStar(star - 1);
    let newStarray = existingStarray;
    newStarray = newStarray.replace(
        new RegExp(`import star${star - 1} from "../day${dayForPreviousStar}/star${star - 1}.js";`, "g"),
        `import star${star - 1} from "../day${dayForPreviousStar}/star${star - 1}.js";
import star${star} from "../day${day}/star${star}.js";`
    );
    newStarray = newStarray.replace(new RegExp(`star${star - 1}];`, "g"), `star${star - 1}, star${star}];`);
    fs.writeFileSync(starrayPath, newStarray);
    execSync(`npx prettier --write ${starrayPath}`);
};

const updateVsCodeLaunch = (star) => {
    const vsCodeLaunchPath = "./.vscode/launch.json";
    const existingLaunch = fs.readFileSync(vsCodeLaunchPath).toString();
    const newLaunch = existingLaunch.replace(new RegExp(`star${star - 1}`, "g"), `star${star}`);
    fs.writeFileSync(vsCodeLaunchPath, newLaunch);
};

const generateStar = () => {
    const nextStar = getCurrentStarCount() + 1;
    const dayForNextStar = getDayForStar(nextStar);
    if (!fs.existsSync(`./day${dayForNextStar}`)) {
        fs.mkdirSync(`day${dayForNextStar}`);
        fs.writeFileSync(`./day${dayForNextStar}/input.txt`, "");
    }
    fs.writeFileSync(`./day${dayForNextStar}/star${nextStar}.js`, createStarTemplate(nextStar, dayForNextStar));
    updateStarray(nextStar, dayForNextStar);
    updateVsCodeLaunch(nextStar);
};

execute();
