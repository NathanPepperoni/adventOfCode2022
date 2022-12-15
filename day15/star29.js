import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const sensor = 0;
const beacon = 1;
const X = 0;
const Y = 1;

function calculateRectilinearDistance(point1, point2) {
    return Math.abs(point1[X] - point2[X]) + Math.abs(point1[Y] - point2[Y]);
}

function isInPerimeter(point, sensor, beacon) {
    const distanceToSensor = calculateRectilinearDistance(point, sensor);
    const beaconDistance = calculateRectilinearDistance(sensor, beacon);

    return distanceToSensor <= beaconDistance;
}

function calculateMinMax(input) {
    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;

    input.forEach((line) => {
        const size = calculateRectilinearDistance(line[sensor], line[beacon]);
        const perimMin = line[sensor][X] - size;
        const perimMax = line[sensor][X] + size;

        minX = Math.min(minX, perimMin);
        maxX = Math.max(maxX, perimMax);
    });

    return { minX, maxX };
}

function getBeaconPositionsOnRow(input, row) {
    const beacons = [];
    input.forEach((line) => {
        if (line[beacon][Y] === row) {
            beacons.push(JSON.stringify(line[beacon]));
        }
    });

    return new Set(beacons);
}

function star29() {
    const input = loadPuzzleInput(15)
        .filter((line) => line.length > 0)
        .map((line) =>
            line
                .replace("Sensor at x=", "")
                .replaceAll(" y=", "")
                .replace(" closest beacon is at x=", "")
                .split(":")
                .map((coords) => {
                    const split = coords.split(",");
                    return [Number.parseInt(split[0]), Number.parseInt(split[1])];
                })
        );

    const rowToCalculate = 2000000;
    const { minX, maxX } = calculateMinMax(input);
    const knownBeacons = getBeaconPositionsOnRow(input, rowToCalculate);

    let count = 0;
    for (let x = minX; x <= maxX; x++) {
        if (knownBeacons.has(JSON.stringify([x, rowToCalculate]))) {
            continue;
        }
        let inRange = false;
        input.forEach((line) => {
            inRange = inRange || isInPerimeter([x, rowToCalculate], line[sensor], line[beacon]);
        });
        if (inRange) {
            count++;
        }
    }
    return count;
}

export default star29;
