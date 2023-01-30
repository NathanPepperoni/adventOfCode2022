import { Heap } from "heap-js";
import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function incrementBranch(valveSystem, currentBranch, visited, valveMap) {
    const newBranches = [];

    const connectedValves = currentBranch.valve.connectedValves;

    connectedValves.forEach((valve) => {
        const newPath = [...currentBranch.path];
        newPath.push(valve);
        newBranches.push({
            steps: currentBranch.steps + 1,
            path: newPath,
            valve: valveMap[valve],
        });
    });

    return newBranches;
}

const pathSolutions = {};

function calculatePathToValve(valveSystem, source, destination, valveMap) {
    if (pathSolutions[source.label + destination.label] !== undefined) {
        return pathSolutions[source.label + destination.label];
    }
    const startingPosition = source.label;
    const branchHeap = new Heap((a, b) => a.steps - b.steps);
    branchHeap.init([{ steps: 0, path: [startingPosition], valve: source }]);

    const visitedPositions = new Set(startingPosition);
    while (true) {
        const shortestBranch = branchHeap.pop();
        const newBranches = incrementBranch(valveSystem, shortestBranch, visitedPositions, valveMap);
        for (let i = 0; i < newBranches.length; i++) {
            const branchPath = newBranches[i].path;
            if (branchPath[branchPath.length - 1] === destination.label) {
                pathSolutions[source.label + destination.label] = newBranches[i];
                return newBranches[i];
            }
            visitedPositions.add(newBranches[i].position);
        }
        branchHeap.addAll(newBranches);
    }
}

function greedyApproach(valveSystem, valveMap) {
    let totalFlow = 0;
    let time = 30;
    let currentValve = valveSystem[0];
    const openValves = [];
    while (time > 0) {
        let valveOptions = [];
        console.log(time);
        for (let i = 0; i < valveSystem.length; i++) {
            const valveLabel = valveSystem[i].label;
            if (valveLabel === currentValve.label || openValves.includes(valveLabel) || valveSystem[i].flowRate === 0) {
                continue;
            }
            const pathToValve = calculatePathToValve(valveSystem, currentValve, valveSystem[i], valveMap);
            const flowRate = valveSystem[i].flowRate;

            const valveValue = (time - pathToValve.steps - 1) * flowRate;
            valveOptions.push({
                valve: valveSystem[i],
                timeAfter: time - pathToValve.steps - 1,
                value: valveValue,
                path: pathToValve,
            });
        }
        valveOptions.sort((a, b) => b.value - a.value);
        if (valveOptions.length > 0) {
            const bestValve = valveOptions[0];
            totalFlow += bestValve.value;
            openValves.push(bestValve.valve.label);
            time = bestValve.timeAfter;
            currentValve = bestValve.valve;
        } else {
            time--;
        }
    }

    return totalFlow;
}

function parseInput(input) {
    return input
        .filter((line) => line.length > 0)
        .map((line) => {
            const cleanedLine = line
                .replace("Valve ", "")
                .replace(" has flow rate=", ",")
                .replace("; tunnels ", "")
                .replace("; tunnel ", "")
                .replace("leads", "")
                .replace("lead", "")
                .replace(" to valves ", ",")
                .replace(" to valve ", ",")
                .replaceAll(" ", "")
                .split(",");

            return {
                label: cleanedLine[0],
                flowRate: Number.parseInt(cleanedLine[1]),
                connectedValves: cleanedLine.slice(2),
            };
        });
}

function createValveMap(valveSystem) {
    const valveMap = {};
    valveSystem.forEach((valve) => {
        valveMap[valve.label] = valve;
    });

    return valveMap;
}

function star31() {
    const input = loadPuzzleInput(16).filter((line) => line.length > 0);
    const valveSystem = parseInput(input);
    const valveMap = createValveMap(valveSystem);
    return greedyApproach(valveSystem, valveMap);
}

export default star31;
