import starray from "./utils/starray.js";

const invalidArguments = () => {
  console.log("Invalid argument. Please read the README.");
};

const execute = () => {
  const args = process.argv;
  const cliArg = args[2].toLowerCase();
  const argNumber = Math.max(Number.parseInt(cliArg.replace("star", "").replace("day", "")), 1);
  if (Number.isNaN(argNumber)) {
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

execute();
